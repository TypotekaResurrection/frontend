import styles from "./styles.module.scss";

function ArticleCommentsSection({ comments }) {
  const hasComments = comments.length !== 0;
  return (
    <div className={styles.commentsWrapper}>
      <section className={styles.commentsSection}>
        <h2 id="comments">
          {hasComments ? "Коментарі" : "Коментарі відсутні"}
        </h2>
        {hasComments ? (
          <ul className={styles.commentsList}>
            {comments.map((comment) => {
              return (
                <li className={styles.comment} key={comment.name}>
                  <div className={styles.text}>
                    <div className={styles.head}>
                      <p>{comment.name}</p>
                      <time
                        dateTime={new Date(comment.date).toLocaleDateString()}
                      >
                        {new Date(comment.date).toLocaleDateString()}
                      </time>
                    </div>
                    <p className={styles.message}>{comment.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
        <div className={styles.footer}>
          <button type="submit" className={styles.loginButton}>
            Ввійти
          </button>
          <div className={styles.registration}>
            <p>
              <b>Реєстрація</b>
              Щоб приєднатися до листування, потрібно зареєструватися
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticleCommentsSection;
