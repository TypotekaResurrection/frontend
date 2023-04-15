import Header from "@components/Header";
import ThemeList from "@components/ThemeList";
import styles from "./styles.module.scss";
import global from "../styles/global.module.scss";
import HotArticlesSection from "@components/HotArticlesSection";
import LastCommentsSection from "@components/LastCommentsSection";
import Footer from "@components/Footer";
import ArticlesSection from "@components/ArticlesSection";

import { useState } from "react";
import { useAuth } from "@api/auth";

export default function Home() {
  const [themes, setThemes] = useState([]);
  const { isSignedIn, isStaff } = useAuth();

  function handleThemeListChange({ activeThemes }) {
    setThemes(activeThemes);
  }

  return (
    <div className={styles.wrapper}>
      <Header isUser={isSignedIn()} isAdmin={isStaff} />
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
          <HotArticlesSection />
          <LastCommentsSection />
        </div>
        <ArticlesSection filter={themes} />
      </main>
      <Footer />
    </div>
  );
}
