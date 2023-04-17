import ArticlesPreviewView from "@components/ArticlesPreviewView";
import Pagination from "@components/Pagination";
import { PaginationParams } from "@models/pagination";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useQuery } from "@apollo/client";
import { getArticlesQuery } from "@api/articles";

function ArticlesSection({ filter }) {
  const { data } = useQuery(getArticlesQuery);
  const articles =
    data?.getArticles?.filter((article) =>
      filter.length === 0
        ? true
        : article.categories.some((val) => filter.includes(val))
    ) || [];

  const getArticlesCount = () => articles?.length;

  const articlesPerOnePage = 4;
  const paginationItemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const paginationParams = new PaginationParams(
    Math.ceil(getArticlesCount() / articlesPerOnePage),
    paginationItemsPerPage
  );

  const articleStartIndex = articlesPerOnePage * currentPage;
  const articleEndIndex =
    articlesPerOnePage * currentPage + articlesPerOnePage - 1;

  const getCurrentArticles = () =>
    articles?.filter(
      (_, index) => index >= articleStartIndex && index <= articleEndIndex
    );

  return (
    <div className={styles.articlesSectionWrapper}>
      <section className={styles.articlesWrapper}>
        {articles?.length !== 0 ? (
          <ArticlesPreviewView articles={getCurrentArticles()} />
        ) : (
          <div className={styles.noPages}>Тут поки нічого немає...</div>
        )}
      </section>
      <div className={styles.paginationWrapper}>
        <Pagination
          paginationParams={paginationParams}
          currentPage={currentPage}
          onChange={({ index }) => {
            setCurrentPage(index - 1);
          }}
        />
      </div>
    </div>
  );
}

export default ArticlesSection;
