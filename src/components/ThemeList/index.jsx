import styles from "./styles.module.scss";
import global from "@styles/global.module.scss";
import ThemeListItem from "@components/ThemeListItem";
import { getArticlesFromJson, getCategoriesFromArticles } from "utils";
import { useEffect, useState } from "react";

function ThemeList({ onChange }) {
  const articles = getArticlesFromJson();

  const themes = getCategoriesFromArticles(articles);
  const [activeThemes, setActiveThemes] = useState([]);

  useEffect(() => {
    onChange({ activeThemes });
  }, [activeThemes]);

  function handleThemeListItemClick({ title }) {
    if (activeThemes.includes(title)) {
      const auxArray = [...activeThemes];
      const index = auxArray.indexOf(title);
      auxArray.splice(index, 1);
      setActiveThemes(auxArray);
    } else {
      setActiveThemes([...activeThemes, title]);
    }
  }

  return (
    <section className={styles.themeList}>
      <h2 className={global.visuallyHidden}>Теми блогу</h2>
      <ul className={styles.themes}>
        {themes.map((theme) => (
          <li key={theme.title}>
            <ThemeListItem
              title={theme.title}
              state={false}
              count={theme.count}
              onClick={handleThemeListItemClick}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ThemeList;
