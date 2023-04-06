import Footer from "@components/Footer";
import Header from "@components/Header";
import styles from "./styles.module.scss";
import slugify from "slugify";
import Link from "next/link";
import { useAdminGuard } from "api/auth";
import { deleteComment, useAllComments } from "api/comments";

function AdminCommentsPage() {
  const [comments, updateComments] = useAllComments();

  async function handleDeleteButton(id) {
    try {
      await deleteComment(id);
      await updateComments();
    } catch (e) {
      console.log(e);
    }
  }

  useAdminGuard();
  return (
    <div className={styles.wrapper}>
      <Header isUser isAdmin />
      <main className={styles.mainPage}>
        <section className={styles.commentsSection}>
          <h1 className={styles.title}>Коментарі</h1>
          <ul className={styles.commentsList}>
            {comments.map((comment) => (
              <li className={styles.listItem} key={comment.id}>
                <div className={styles.header}>
                  <b className={styles.name}>
                    {comment.owner.first_name + comment.owner.last_name}
                  </b>
                  <time
                    className={styles.time}
                    dateTime={new Date(comment.time).toLocaleDateString()}
                  >
                    {new Date(comment.time).toLocaleDateString().slice(0, 24)}
                  </time>
                </div>
                <Link
                  className={styles.text}
                  href={
                    "/articles/" + slugify(comment.article.title.toLowerCase())
                  }
                >
                  {comment.content}
                </Link>
                <p className={styles.articleTitle}>{comment.article.title}</p>
                <button
                  type="button"
                  className={styles.button}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteButton(comment.id);
                  }}
                ></button>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AdminCommentsPage;
