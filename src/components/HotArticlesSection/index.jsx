import HotArticlesList from "@components/HotArticlesList";
import styles from "./styles.module.scss";
import { Article } from "@models/articles";
import { getHotArticlesFromJson } from "utils";

function HotArticlesSection() {
  let hotArticles = getHotArticlesFromJson();
  return (
    <section className={styles.hotArticlesSection}>
      <h2 className={styles.name}>
        Найбільш обговорюване <span className={styles.icon}></span>
      </h2>
      {hotArticles.length !== 0 ? (
        <HotArticlesList articles={hotArticles} />
      ) : (
        <p>Тут поки що нічого...</p>
      )}
    </section>
  );
}

export default HotArticlesSection;
