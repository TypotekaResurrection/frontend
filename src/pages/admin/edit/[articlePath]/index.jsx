import Header from "@components/Header";
import PublicationForm from "@components/PublicationForm";
import { createArticle, getArticlesQuery, updateArticle } from "api/articles";
import { useAdminGuard, useAuth } from "@api/auth";
import Router from "next/router";
import client from "@api/apollo-client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useQuery } from "@apollo/client";
import { getCategoriesQuery } from "@api/categories";
import slugify from "slugify";

export async function getStaticPaths() {
  const articles = (await client.query({ query: getArticlesQuery })).data
    .getArticles;
  const paths = [
    ...articles.map((article) => ({
      params: {
        articlePath: slugify(article.title.toLowerCase()),
      },
    })),
  ];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const articles = (await client.query({ query: getArticlesQuery })).data
    .getArticles;
  const article = articles.find(
    (article) =>
      slugify(article.title.toLowerCase()) === context.params.articlePath
  );

  return {
    props: {
      articlePath: context.params.articlePath,
      articleJSON: JSON.stringify(article),
    },
  };
}

function AdminEditPage({ articleJSON }) {
  const article = JSON.parse(articleJSON);
  const { isStaff, createApolloClient } = useAuth();
  useAdminGuard(isStaff);
  const { data } = useQuery(getCategoriesQuery);
  const allCategories = data?.getCategories || [];

  const [form, setForm] = useState({
    title: article.title,
    imageUrl: article.imageUrl,
    chosenCategories: [],
    text: article.text,
    preview: article.preview,
  });

  useEffect(() => {
    setForm({
      ...form,
      chosenCategories: allCategories
        .filter((category) => article.categories.includes(category.name))
        .map((category) => category.name),
    });
  }, [allCategories]);

  console.log(form.chosenCategories);

  const canPost = form.title && form.text && form.preview;

  async function handlePostButtonClick(e) {
    e.preventDefault();
    if (canPost) {
      try {
        await updateArticle(createApolloClient(), {
          id: article.id,
          title: form.title,
          text: form.text,
          preview: form.preview,
          imageUrl: form.imageUrl,
          categoryIds: allCategories
            .filter((category) => form.chosenCategories.includes(category.name))
            .map((category) => category.id),
          date: new Date(),
        });
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
                  <h1>Редагування публікації</h1>
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
                          placeholder={new Date(
                            article.date
                          ).toLocaleDateString()}
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
                    Оновити
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

export default AdminEditPage;
