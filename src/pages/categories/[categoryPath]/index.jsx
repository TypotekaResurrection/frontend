import slugify from "slugify";
import styles from "./styles.module.scss";
import Header from "@components/Header";
import Footer from "@components/Footer";
import ArticlesSection from "@components/ArticlesSection";
import { getCategories } from "api/categories";
import { getArticles } from "api/articles";
import client from "@api/apollo-client";

export async function getServerSideProps(context) {
  const articles = (await getArticles(client)) ?? [];
  const categories = (await await getCategories(client)) ?? [];
  const category = categories.find(
    (category) =>
      slugify(category.name.toLowerCase()) === context.params.categoryPath
  );
  return {
    props: {
      articles,
      categoryPath: context.params.categoryPath,
      categoryName: category.name,
    },
  };
}

function CategoryPage({ categoryName, articles }) {
  console.log(categoryName);
  //const [isUser, isAdmin] = useAuth();
  return (
    <div className={styles.wrapper}>
      <Header isUser={false} isAdmin={false} />
      <main className={styles.categoryPage}>
        <h1>{categoryName}</h1>
        <ArticlesSection articles={articles} filter={[categoryName]} />
      </main>
      <Footer />
    </div>
  );
}

export default CategoryPage;
