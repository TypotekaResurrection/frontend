import LastCommentsList from "@components/LastCommentsList";
import styles from "./styles.module.scss";
import { getLastCommentsFromJson } from "utils";

function LastCommentsSection() {
  let comments = getLastCommentsFromJson();

  return (
    <section className={styles.lastCommentsSection}>
      <h2 className={styles.name}>
        Останні коментарі <span className={styles.icon}></span>
      </h2>
      {comments.length !== 0 ? (
        <LastCommentsList comments={comments} />
      ) : (
        <p>Тут поки що нічого...</p>
      )}
    </section>
  );
}

export default LastCommentsSection;
