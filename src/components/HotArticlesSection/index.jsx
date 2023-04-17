import HotArticlesList from "@components/HotArticlesList";
import styles from "./styles.module.scss";
import { Article } from "@models/articles";
import { getHotArticlesFromJson } from "utils";
import { useAuth } from "@api/auth";
import { getHotArticles } from "@api/articles";
import { useQuery } from "@apollo/client";
import { getHotArticlesQuery } from "@api/articles";

function HotArticlesSection() {
  const { data, loading } = useQuery(getHotArticlesQuery, {
    variables: { limit: 4 },
  });
  return (
    <section className={styles.hotArticlesSection}>
      <h2 className={styles.name}>
        Найбільш обговорюване <span className={styles.icon}></span>
      </h2>
      {data?.getHotArticles?.length !== 0 ? (
        <HotArticlesList articles={data?.getHotArticles || []} />
      ) : (
        <p>Тут поки що нічого...</p>
      )}
    </section>
  );
}

export default HotArticlesSection;
