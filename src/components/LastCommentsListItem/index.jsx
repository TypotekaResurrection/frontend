import styles from "./styles.module.scss";

function LastCommentsListItem({ comment }) {
  return (
    <li className={styles.commentListItem}>
      <b className={styles.name}>{comment.name}</b>
      <a className={styles.body} href={comment.href}>
        {comment.body}
      </a>
    </li>
  );
}

export default LastCommentsListItem;
