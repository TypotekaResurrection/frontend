import Loader from "@components/Loader";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useAuth } from "@api/auth";

function Header() {
  const { isLoading, isSignedIn, isStaff } = useAuth();
  function getDefaultInterface() {
    return (
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          Факультет Інформатики
        </Link>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Link href="/register" className={styles.registration}>
              Реєстрація
            </Link>
            <Link href="/login" className={styles.enter}>
              Вхід з паролем
            </Link>
            <Link href="/search" className={styles.buttonSearch}></Link>
          </>
        )}
      </header>
    );
  }

  function getUserInterface() {
    return (
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          Факультет Інформатики
        </Link>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Link href="/exit" className={styles.enter}>
              Вийти
            </Link>
            <Link href="/search" className={styles.buttonSearch}></Link>
          </>
        )}
      </header>
    );
  }

  function getAdminInterface() {
    return (
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          Факультет Інформатики
        </Link>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <Link className={styles.buttonAddArticle} href="/admin/create">
              Новий запис
            </Link>
            <div className={styles.dropdown}>
              <a href="#" className={styles.button}>
                Відкрити меню
              </a>
              <ul className={styles.adminNavigation}>
                <li>
                  <Link href="/admin/posts">Мої записи</Link>
                </li>
                <li>
                  <Link href="/admin/comments">Мої коментарі</Link>
                </li>
                <li>
                  <Link href="/admin/categories">Мої категорії</Link>
                </li>
                <li>
                  <Link href="/exit">Вийти</Link>
                </li>
              </ul>
            </div>
            <Link href="/search" className={styles.buttonSearch}></Link>
          </>
        )}
      </header>
    );
  }

  return isLoading ? (
    <Loader />
  ) : !isSignedIn() ? (
    getDefaultInterface()
  ) : !isStaff ? (
    getUserInterface()
  ) : (
    getAdminInterface()
  );
}

export default Header;
