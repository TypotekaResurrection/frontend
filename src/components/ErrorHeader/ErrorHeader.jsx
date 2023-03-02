import styles from "./styles.module.scss";
import Link from "next/link";

function ErrorHeader({ statusCode }) {
  return (
    <header className={`${styles.header} ${styles["header--error"]}`}>
      <Link
        className={`${styles.header__logo} ${
          styles["header__logo--" + statusCode]
        } ${styles.logo}`}
        href="#"
      ></Link>
    </header>
  );
}
export default ErrorHeader;
