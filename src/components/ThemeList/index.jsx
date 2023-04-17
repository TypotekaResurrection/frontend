import styles from "./styles.module.scss";
import global from "@styles/global.module.scss";
import ThemeListItem from "@components/ThemeListItem";
import { getArticlesFromJson, getCategoriesFromArticles } from "utils";
import { useEffect, useState } from "react";
import { getCategories } from "@api/categories";
import { useAuth } from "@api/auth";
import { getArticles } from "@api/articles";

function ThemeList({ onChange, loadFromSource, value = [] }) {
  const [themes, setThemes] = useState([]);
  const { createApolloClient } = useAuth();
  useEffect(() => {
    const loadThemes = async () => {
      if (loadFromSource) {
        const sourceThemes = await getCategories(createApolloClient());
        setThemes(sourceThemes);
      } else {
        const articles = await getArticles(createApolloClient());
        setThemes(getCategoriesFromArticles(articles));
      }
    };
    loadThemes();
  }, []);

  console.log(value);
  const [activeThemes, setActiveThemes] = useState([...value]);

  useEffect(() => {
    onChange({ activeThemes });
  }, [activeThemes, value]);

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
          <li key={theme.name}>
            <ThemeListItem
              title={theme.name}
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
