import styles from "./styles.module.scss";
import Image from "next/image";
import slugify from "slugify";
import Link from "next/link";

function ArticlePreview({ article }) {
  const { categories } = article;
  const getArticleHref = () =>
    "/articles/" + slugify(article.title.toLowerCase());
  const hasImage = typeof article.imageUrl != "undefined";

  const getCategoryBreadCrumbs = () =>
    categories.map((category) => (
      <li className={styles.item} key={category}>
        <Link href={"/categories/" + slugify(category.toLowerCase())}>
          {category}
        </Link>
      </li>
    ));

  return (
    <li className={styles.articlePreview}>
      <ul className={styles.previewBreadcrumbs}>{getCategoryBreadCrumbs()}</ul>
      {hasImage ? (
        <div className={styles.previewBackground}>
          <Image
            src={article.imageUrl}
            alt="Article background"
            width={560}
            height={300}
          />
        </div>
      ) : null}
      <h3 className={styles.name}>
        <Link href={getArticleHref()}>{article.title}</Link>
      </h3>
      <p className={styles.previewText}>{article.preview}</p>
      <a
        href={getArticleHref() + "#comments"}
        className={styles.previewComments}
      >
        Коментарі <span className={styles.icon}></span>
        <b>{article.count}</b>
      </a>
    </li>
  );
}

export default ArticlePreview;
