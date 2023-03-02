import styles from "./styles.module.scss";
import Link from "next/link";

function Error404() {
  return (
    <div class={styles.center}>
      <h1 className={styles.error__title}>Помилка 404</h1>
      <section class={styles.error}>
        <h2
          class={`${styles.error__title} ${styles.title} ${styles.title_big}`}
        >
          Схоже, помилились адресою
        </h2>
        <Link
          class={`${styles.error__link} ${styles.text} ${styles.text__big}`}
          href="/"
        >
          Повернутися на головну сторінку
        </Link>
      </section>
    </div>
  );
}

export default Error404;
