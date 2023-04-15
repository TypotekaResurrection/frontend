import Header from "@components/Header";
import PublicationForm from "@components/PublicationForm";
import { createArticle } from "api/articles";
import { useAdminGuard, useAuth } from "@api/auth";
import Router from "next/router";
import { useState } from "react";
import styles from "./styles.module.scss";

function AdminCreatePage() {
  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    chosenCategories: [],
    text: "**Hello world**",
    preview: "",
  });
  const canPost = form.title && form.text && form.preview;
  const { isStaff } = useAuth();
  useAdminGuard(isStaff);

  async function handlePostButtonClick(e) {
    e.preventDefault();
    if (canPost) {
      try {
        await createArticle(
          form.title,
          form.preview,
          form.imageUrl,
          form.chosenCategories,
          form.text
        );
        Router.push("/admin/posts/");
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <div className={styles.wrapper}>
      <Header isAdmin isUser />
      <main>
        <section>
          <div className={styles.createSection}>
            <div className={styles.newPublication}>
              <form action="#" method="POST">
                <div className={styles.publicationHeader}>
                  <h1>Нова публікація</h1>
                  <div className={styles.publicationDateForm}>
                    <h3>Дата публікації</h3>
                    <div className={styles.division}>
                      <div className={styles.dateBlock}>
                        <label
                          htmlFor="new-publication-date"
                          aria-label="Календар"
                        ></label>
                        <input
                          type="text"
                          name="date"
                          placeholder={new Date().toLocaleDateString()}
                          id="new-publication-date"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className={styles.button}
                    onClick={handlePostButtonClick}
                  >
                    Опублікувати
                  </button>
                </div>
                <PublicationForm value={form} onChange={setForm} />
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminCreatePage;
