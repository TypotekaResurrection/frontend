import Link from "next/link";
import slugify from "slugify";
import styles from "./styles.module.scss";

function SearchResult({ article }) {
  return (
    <div className={styles.searchResult}>
      <Link href={"/articles/" + slugify(article.title.toLowerCase())}>
        {article.title}
      </Link>
    </div>
  );
}

export default SearchResult;
