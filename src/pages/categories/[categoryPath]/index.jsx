import slugify from "slugify";
import styles from "./styles.module.scss";
import Header from "@components/Header";
import Footer from "@components/Footer";
import ArticlesSection from "@components/ArticlesSection";
import { getCategories } from "api/categories";
import { getArticles } from "api/articles";
import { useAuth } from "api/auth";

export async function getServerSideProps(context) {
  const articles = (await getArticles()).data ?? [];
  const categories = (await (await getCategories()).data) ?? [];
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
  //const [isUser, isAdmin] = useAuth();
  return (
    <div className={styles.wrapper}>
      <Header isUser={false} isAdmin={false} />
      <main className={styles.categoryPage}>
        <h1>{categoryName}</h1>
        <ArticlesSection
          articles={articles}
          filter={[{ title: categoryName }]}
        />
      </main>
      <Footer />
    </div>
  );
}

export default CategoryPage;
