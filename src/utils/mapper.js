import { Article } from "@models/articles";

export function mapArticles(articles) {
  return articles.map(
    (article) =>
      new Article(
        article.title,
        0,
        article.href,
        article.categories,
        article.image,
        article.date,
        article.text
      )
  );
}
