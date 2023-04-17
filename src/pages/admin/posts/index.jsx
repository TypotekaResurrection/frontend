import Footer from "@components/Footer";
import Header from "@components/Header";
import Link from "next/link";
import styles from "./styles.module.scss";
import slugify from "slugify";
import { useAdminGuard, useAuth } from "api/auth";
import { deleteArticle, getArticlesQuery } from "api/articles";
import { useQuery } from "@apollo/client";

function AdminPostsPage() {
  const { isStaff, createApolloClient } = useAuth();

  useAdminGuard(isStaff);
  const { data, refetch } = useQuery(getArticlesQuery);
  const articles = data?.getArticles || [];

  async function handleDeleteButtonClick(id) {
    try {
      await deleteArticle(createApolloClient(), id);
      await refetch();
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className={styles.wrapper}>
      <Header isAdmin isUser />
      <main className={styles.mainPage}>
        <section className={styles.notesSection}>
          <h1 className={styles.title}>Мої записи</h1>
          <ul className={styles.notesList}>
            {articles.map((article, index) => (
              <li className={styles.listItem} key={index}>
                <time
                  className={styles.time}
                  dateTime={new Date(article.date).toLocaleDateString()}
                >
                  {new Date(article.date).toLocaleDateString()}
                </time>
                <Link
                  className={styles.text}
                  href={"/articles/" + slugify(article.title.toLowerCase())}
                >
                  {article.title}
                </Link>
                <button
                  className={styles.button}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteButtonClick(article.id);
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

export default AdminPostsPage;
