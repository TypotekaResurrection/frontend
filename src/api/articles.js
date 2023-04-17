import { gql } from "@apollo/client";

export const getArticlesQuery = gql`
  query GetArticles {
    getArticles {
      id
      title
      date
      preview
      text
      imageUrl
      categories
    }
  }
`;

export const getHotArticlesQuery = gql`
  query GetHotArticles($limit: Int!) {
    getHotArticles(limit: $limit) {
      id
      title
      date
      preview
      text
      imageUrl
    }
  }
`;

export const createArticleMutation = gql`
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
      title
      date
      preview
      text
      imageUrl
    }
  }
`;

export const deleteArticleMutation = gql`
  mutation DeleteArticle($id: Int!) {
    deleteArticle(id: $id) {
      success
    }
  }
`;

export const updateArticleMutation = gql`
  mutation UpdateArticle($id: Int!, $input: UpdateArticleInput!) {
    updateArticle(id: $id, input: $input) {
      id
      title
      date
      preview
      text
      imageUrl
      userId
    }
  }
`;

export const searchQuery = gql`
  query SearchArticles($title: String!) {
    findArticlesByTitle(title: $title) {
      id
      title
      date
      preview
      text
      imageUrl
    }
  }
`;

export async function getArticles(client) {
  return (await client.query({ query: getArticlesQuery })).data.getArticles;
}

export async function getHotArticles(client, limit = 4) {
  return await client.query({
    query: getHotArticlesQuery,
    variables: { limit },
  });
}

export async function searchForArticles(client, title) {
  return (
    await client.query({
      query: searchQuery,
      variables: { title },
    })
  ).data.findArticlesByTitle;
}

export async function createArticle(
  client,
  { title, text, preview, categoryIds, imageUrl }
) {
  return await client.mutate({
    mutation: createArticleMutation,
    variables: { input: { title, text, preview, categoryIds, imageUrl } },
  });
}

export async function updateArticle(
  client,
  { id, title, text, preview, categoryIds, imageUrl, date }
) {
  return await client.mutate({
    mutation: updateArticleMutation,
    variables: {
      id,
      input: { title, text, preview, categoryIds, imageUrl },
    },
  });
}

export async function deleteArticle(client, id) {
  return await client.mutate({
    mutation: deleteArticleMutation,
    variables: { id },
  });
}
