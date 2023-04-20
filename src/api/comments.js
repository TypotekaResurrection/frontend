import { useState, useEffect } from "react";
import { buildDeleteRequest, buildGetRequest, buildPostRequest } from "./utils";
import { getToken } from "./utils/tokenService";
import { gql } from "@apollo/client";

export const getAllCommentsQuery = gql`
  query GetAllComments($limit: Int!) {
    getComments(limit: $limit) {
      id
      date
      content
      articleName
      userName
    }
  }
`;

export const getCommentsFromArticleQuery = gql`
  query GetCommentsFromArticle($articleId: Int!, $limit: Int!) {
    getCommentsByArticleId(articleId: $articleId, limit: $limit) {
      id
      date
      content
      articleName
      userName
    }
  }
`;

export const createCommentMutation = gql`
  mutation CreateComment($input: CreateCommentInput) {
    createComment(input: $input) {
      id
      date
      content
      articleName
      userName
    }
  }
`;

export const deleteCommentMutation = gql`
  mutation DeleteComment($id: Int!) {
    deleteComment(id: $id) {
      success
    }
  }
`;

export async function getComments(client, articleId, limit) {
  return (
    await client.query({
      query: getCommentsFromArticleQuery,
      variables: {
        articleId,
        limit,
      },
    })
  ).data.getCommentsByArticleId;
}

export async function getAllComments(client, limit) {
  return (await client.query({ query: getAllComments, variables: { limit } }))
    .data.getComments;
}

export async function getAllLastComments(limit = 3) {
  return await buildGetRequest("/comments/", { limit })(
    await client.query({ query: getAllComments })
  ).data.getComments;
}

export async function addComment(client, articleId, content) {
  return (
    await client.mutate({
      mutation: createCommentMutation,
      variables: {
        input: {
          articleId,
          content,
        },
      },
    })
  ).data.createComment;
}

export async function deleteComment(client, id) {
  return (
    await client.mutate({
      mutation: deleteCommentMutation,
      variables: {
        id,
      },
    })
  ).data.deleteComment;
}

export function useComments(client, articleId, initValue = []) {
  const [comments, setComments] = useState(initValue);
  const loadComments = async () => {
    try {
      const newComments = await getComments(client, articleId, 240);
      setComments(newComments);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!initValue.length > 0) {
      loadComments();
    }
  }, []);

  return [comments, loadComments];
}

export function useAllComments(method = getAllComments) {
  const [comments, setComments] = useState([]);
  const loadComments = async () => {
    try {
      setComments((await method()).data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  return [comments, loadComments];
}
