import { useState, useEffect } from "react";
import { buildDeleteRequest, buildGetRequest, buildPostRequest } from "./utils";
import { getToken } from "./utils/tokenService";

export async function getComments(articleId) {
  return await buildGetRequest("/articles/" + articleId + "/comments/");
}

export async function getAllComments() {
  return await buildGetRequest("/comments/");
}

export async function getAllLastComments(limit = 3) {
  return await buildGetRequest("/comments/", { limit });
}

export async function addComment(articleId, content) {
  return await buildPostRequest(
    "/articles/" + articleId + "/comments/",
    { content },
    { Authorization: "Token " + getToken() }
  );
}

export async function deleteComment(id) {
  return await buildDeleteRequest("/comments/" + id + "/", {
    Authorization: "Token " + getToken(),
  });
}

export function useComments(articleId, initValue = []) {
  const [comments, setComments] = useState(initValue);
  const loadComments = async () => {
    try {
      setComments((await getComments(articleId)).data);
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
