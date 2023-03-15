import {
  getArticlesFromJson,
  getCategoriesFromArticle,
  getCommentsFromJson,
} from "utils";
import slugify from "slugify";
import styles from "./styles.module.scss";
import global from "@styles/global.module.scss";
import Header from "@components/Header";
import ThemeListItem from "@components/ThemeListItem";
import Image from "next/image";
import Link from "next/link";
import ArticleContent from "@components/ArticleContent";
import ArticleCommentsSection from "@components/ArticleCommentsSection";

export async function getStaticPaths() {
  const articles = getArticlesFromJson();
  const paths = [
    ...articles.map((article) => ({
      params: {
        articlePath: slugify(article.title.toLowerCase()),
      },
    })),
  ];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const articles = getArticlesFromJson();
  const article = articles.find(
    (article) =>
      slugify(article.title.toLowerCase()) === context.params.articlePath
  );

  return {
    props: {
      articlePath: context.params.articlePath,
      articleJSON: JSON.stringify(article),
    },
  };
}

function ArticlePage({ articleJSON }) {
  const article = JSON.parse(articleJSON);
  const comments = getCommentsFromJson();
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        <section className={styles.post}>
          <h1 className={global.visuallyHidden}>Пост</h1>
          <section className={styles.postContent}>
            <h2 className={global.visuallyHidden}>Основний зміст</h2>
            <div className={styles.postWrapper}>
              <div className={styles.postHead}>
                <Link href="/" className={styles.postHeadButton}>
                  Назад
                </Link>
                <time dateTime={article.time} className={styles.time}>
                  {new Date(article.time).toLocaleDateString()}
                </time>
                <h2 className={styles.title}>{article.title}</h2>
                <section className={styles.themeList}>
                  <h2 className={global.visuallyHidden}>Теми блогу</h2>
                  <ul className={styles.themes}>
                    {getCategoriesFromArticle(article).map((theme) => (
                      <li className={styles.listItem} key={theme.title}>
                        <ThemeListItem
                          notClickable={true}
                          title={theme.title}
                          state={false}
                          count={""}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
              {article.image ? (
                <div className={styles.postPicture}>
                  <Image
                    src={article.image}
                    alt="Article background"
                    width={940}
                    height={490}
                  />
                </div>
              ) : null}
              <ArticleContent articleContent={article.text} />
            </div>
          </section>
          <ArticleCommentsSection comments={comments} />
        </section>
      </main>
    </div>
  );
}

export default ArticlePage;
