import { useEffect, useState } from "react";
import { buildDeleteRequest, buildGetRequest, buildPostRequest } from "./utils";
import { getToken } from "./utils/tokenService";
import { gql } from "@apollo/client";

export const getArticlesQuery = gql`
  query GetArticles {
    getArticles {
      id
      title
      date
      preview
      text
      userId
    }
  }
`;

export async function getArticles(client) {
  return await client.query({ query: getArticlesQuery });
}

export async function getHotArticles(limit = 4) {
  return await buildGetRequest("/articles/", { best_first: 1, limit });
}

export async function searchForArticles(search) {
  return await buildGetRequest("/articles/", { search });
}

export async function createArticle(title, preview, cover, categories, body) {
  return await buildPostRequest(
    "/articles/",
    {
      title,
      cover,
      body,
      preview,
      categories: [...categories.map(({ id }) => id)],
    },
    { Authorization: "Token " + getToken() }
  );
}

export async function deleteArticle(id) {
  return await buildDeleteRequest("/articles/" + id + "/", {
    Authorization: "Token " + getToken(),
  });
}

export function useArticles(method = getArticles) {
  const [articles, setArticles] = useState([]);
  const loadArticles = async () => {
    try {
      setArticles((await method()).data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return [articles, loadArticles];
}
