import styles from "./styles.module.scss";

function HotArticlesListItem({ article }) {
  return (
    <li className={styles.hotListItem}>
      <a href={article.href}>
        {article.title}
        <sup>{article.count}</sup>
      </a>
    </li>
  );
}

export default HotArticlesListItem;
