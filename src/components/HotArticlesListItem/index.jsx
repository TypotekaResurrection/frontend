import slugify from "slugify";
import styles from "./styles.module.scss";

function HotArticlesListItem({ article }) {
  return (
    <li className={styles.hotListItem}>
      <a href={`/articles/${slugify(article.title).toLowerCase()}`}>
        {article.title}
        <sup>{article.count}</sup>
      </a>
    </li>
  );
}

export default HotArticlesListItem;
