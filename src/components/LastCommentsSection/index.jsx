import LastCommentsList from "@components/LastCommentsList";
import styles from "./styles.module.scss";
import { useQuery } from "@apollo/client";
import { getAllCommentsQuery } from "@api/comments";

function LastCommentsSection() {
  const { data } = useQuery(getAllCommentsQuery, {
    variables: {
      limit: 3,
    },
  });
  let comments = data?.getComments || [];

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
