import ArticlePreview from "@components/ArticlePreview";
import styles from "./styles.module.scss";

function ArticlesPreviewView({ articles }) {
  return (
    <ul className={styles.articlesPreviewList}>
      {articles.map((article) => (
        <ArticlePreview article={article} key={article.title} />
      ))}
    </ul>
  );
}

export default ArticlesPreviewView;
