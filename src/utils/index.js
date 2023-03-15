import articlesJson from "@mocks/articles.json" assert { type: "json" };
import lastCommentsJson from "@mocks/lastComments.json" assert { type: "json" };
import commentsJson from "@mocks/comments.json" assert { type: "json" };
import hotArticlesJson from "@mocks/hotArticles.json" assert { type: "json" };

import { Article } from "@models/articles";
import { Comment } from "@models/comments";
import { ThemeModel } from "@models/themes";

export function getArticlesFromJson() {
  return articlesJson.articles.map(
    (article) =>
      new Article(
        article.title,
        article.count,
        article.href,
        article.categories,
        article.image,
        article.time,
        article.text
      )
  );
}

export function getLastCommentsFromJson() {
  return lastCommentsJson.comments.map(
    (comment) =>
      new Comment(comment.name, comment.body, comment.href, comment.date)
  );
}

export function getHotArticlesFromJson() {
  return hotArticlesJson.articles.map(
    (article) =>
      new Article(
        article.title,
        article.count,
        article.href,
        article.categories,
        article.image,
        article.time,
        article.text
      )
  );
}

export function getCommentsFromJson() {
  return commentsJson.comments.map(
    (comment) =>
      new Comment(comment.name, comment.body, comment.href, comment.date)
  );
}

export function getCategoriesFromArticles(articles) {
  let categoriesMap = new Map();
  articles.forEach((article) => {
    article.categories.forEach((category) => {
      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, 1);
      } else {
        categoriesMap.set(category, categoriesMap.get(category) + 1);
      }
    });
  });
  return Array.from(categoriesMap).map(
    ([title, count]) => new ThemeModel(title, count)
  );
}

export function getCategoriesFromArticle(article) {
  return article.categories.map((category) => new ThemeModel(category, 0));
}
