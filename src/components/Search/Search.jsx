import styles from "./styles.module.scss";
import SearchResult from "@components/SearchResult/SearchResult";
import { useState } from "react";
import { searchForArticles } from "api/articles";

function Search() {
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  async function handleSendButtonClick() {
    setHasSearched(true);
    try {
      const result = await (await searchForArticles(search)).data;
      setArticles(result);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchContainer}>
        <h1 className={styles.searchHeader}>Пошук</h1>
        <div className={styles.searchFormContainer}>
          <form className={styles.form} action="#" method="get">
            <label className={styles.inputLabel}>
              <input
                className={styles.input}
                type="text"
                name="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Введіть текст"
              />
            </label>
            <button
              className={styles.searchButton}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (search) {
                  handleSendButtonClick();
                }
              }}
            >
              Знайти
            </button>
          </form>
          {articles.map((article) => (
            <SearchResult article={article} key={article.title} />
          ))}
          {hasSearched && articles.length === 0 ? (
            <p className={styles.nothing}>Нічого не знайдено</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default Search;
