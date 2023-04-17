import slugify from "slugify";
import styles from "./styles.module.scss";

function LastCommentsListItem({ comment }) {
  return (
    <li className={styles.commentListItem}>
      <b className={styles.name}>{comment.userName}</b>
      <a
        className={styles.body}
        href={`/articles/${slugify(
          comment.articleName
        ).toLowerCase()}#comments`}
      >
        {comment.content}
      </a>
    </li>
  );
}

export default LastCommentsListItem;
