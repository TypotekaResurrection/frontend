import { useAuth } from "api/auth";
import { addComment, useComments } from "api/comments";
import Router from "next/router";
import { useState } from "react";
import styles from "./styles.module.scss";

function ArticleCommentsSection({ comments, articleId }) {
  const { createApolloClient, isSignedIn } = useAuth();
  const client = createApolloClient();
  const [currentComments, updateComments] = useComments(
    client,
    articleId,
    comments
  );

  const [newComment, setNewComment] = useState("");
  const hasComments = comments.length !== 0;

  async function saveComment() {
    try {
      await addComment(client, articleId, newComment);
      await updateComments();
      setNewComment("");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className={styles.commentsWrapper}>
      <section className={styles.commentsSection}>
        <h2 id="comments">
          {hasComments ? "Коментарі" : "Коментарі відсутні"}
        </h2>
        {hasComments ? (
          <ul className={styles.commentsList}>
            {currentComments.map((comment) => {
              return (
                <li className={styles.comment} key={comment.id}>
                  <div className={styles.text}>
                    <div className={styles.head}>
                      <p>{comment.userName}</p>
                      <time
                        dateTime={new Date(comment.date).toLocaleDateString()}
                      >
                        {new Date(comment.date).toLocaleDateString()}
                      </time>
                    </div>
                    <p className={styles.message}>{comment.content}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
        <div className={styles.footer}>
          {!isSignedIn() ? (
            <>
              <button
                type="submit"
                className={styles.loginButton}
                onClick={(e) => {
                  e.preventDefault();
                  Router.push("/login/");
                }}
              >
                Ввійти
              </button>
              <div className={styles.registration}>
                <p>
                  <b>Реєстрація</b>
                  Щоб приєднатися до листування, потрібно зареєструватися
                </p>
              </div>
            </>
          ) : (
            <>
              <div className={styles.sent}>
                <textarea
                  rows={1}
                  placeholder={"Приєднатися до обговорення"}
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className={styles.loginButton}
                onClick={(e) => {
                  e.preventDefault();
                  if (newComment) {
                    saveComment();
                  }
                }}
              >
                Написати
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default ArticleCommentsSection;
