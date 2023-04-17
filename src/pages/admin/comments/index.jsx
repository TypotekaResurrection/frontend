import Footer from "@components/Footer";
import Header from "@components/Header";
import styles from "./styles.module.scss";
import slugify from "slugify";
import Link from "next/link";
import { useAdminGuard, useAuth } from "api/auth";
import {
  deleteComment,
  getAllCommentsQuery,
  getCommentsFromArticleQuery,
} from "api/comments";
import { useQuery } from "@apollo/client";

function AdminCommentsPage() {
  const { createApolloClient, isStaff } = useAuth();
  useAdminGuard(isStaff);
  const { data, refetch } = useQuery(getAllCommentsQuery, {
    variables: { limit: 240 },
  });
  const comments = data?.getComments || [];

  async function handleDeleteButton(id) {
    try {
      await deleteComment(createApolloClient(), id);
      await refetch();
    } catch (e) {
      console.log(e);
    }
  }

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
                  <b className={styles.name}>{comment.userName}</b>
                  <time
                    className={styles.time}
                    dateTime={new Date(comment.date).toLocaleDateString()}
                  >
                    {new Date(comment.date).toLocaleDateString().slice(0, 24)}
                  </time>
                </div>
                <Link
                  className={styles.text}
                  href={
                    "/articles/" + slugify(comment.articleName.toLowerCase())
                  }
                >
                  {comment.content}
                </Link>
                <p className={styles.articleTitle}>{comment.articleName}</p>
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
