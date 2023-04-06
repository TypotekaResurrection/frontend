import Header from "@components/Header";
import ThemeList from "@components/ThemeList";
import styles from "./styles.module.scss";
import global from "../styles/global.module.scss";
import HotArticlesSection from "@components/HotArticlesSection";
import LastCommentsSection from "@components/LastCommentsSection";
import Footer from "@components/Footer";
import ArticlesSection from "@components/ArticlesSection";
import hotArticles from "@mocks/hotArticles";
import articles from "@mocks/articles";
import comments from "@mocks/comments";

import { useState } from "react";
// import { useAuth } from "api/auth";
// import { getArticles, getHotArticles } from "api/articles";
// import { getAllLastComments } from "api/comments";

export default function Home({ lastComments, hotArticles, articles }) {
  const [themes, setThemes] = useState([]);
  const [isUser, isAdmin] = [false, false];

  function handleThemeListChange({ activeThemes }) {
    setThemes(activeThemes);
  }

  return (
    <div className={styles.wrapper}>
      <Header isUser={isUser} isAdmin={isAdmin} />
      <main className={styles.main}>
        <h1 className={global.visuallyHidden}>
          Головна сторінка особистого блогу
        </h1>
        <p>
          Це вітальний текст, який власник блогу може вибрати, щоб описати себе
          👏
        </p>
        <ThemeList onChange={handleThemeListChange} />
        <div className={styles.flexSection}>
          <HotArticlesSection articles={hotArticles} />
          <LastCommentsSection comments={lastComments} />
        </div>
        <ArticlesSection articles={articles} filter={themes} />
      </main>
      <Footer />
    </div>
  );
}
export async function getServerSideProps() {
  // const hotArticles = (await fetch('mocks/hotArticles.json')).data.results ?? [];
  // const lastComments = (await fetch('mocks/comments.json')).data.results ?? [];
  // const articles = (await fetch('mocks/articles.json')).data ?? [];

  return { props: { hotArticles, comments, articles } };
}
