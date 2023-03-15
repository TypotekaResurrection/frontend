import styles from "./styles.module.scss";
import LastCommentsListItem from "@components/LastCommentsListItem";

function LastCommentsList({ comments }) {
  return (
    <ul className={styles.lastCommentsList}>
      {comments.map((comment) => (
        <LastCommentsListItem comment={comment} key={comment.name} />
      ))}
    </ul>
  );
}

export default LastCommentsList;
