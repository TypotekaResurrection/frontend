import styles from "./styles.module.scss";
import { Article } from "@models/articles";
import HotArticlesListItem from "@components/HotArticlesListItem";

function HotArticlesList({ articles }) {
  return (
    <ul className={styles.hotList}>
      {articles.map((article) => (
        <HotArticlesListItem article={article} key={article.title} />
      ))}
    </ul>
  );
}

export default HotArticlesList;
