import { useEffect, useState } from "react";
import {
  buildDeleteRequest,
  buildGetRequest,
  buildPatchRequest,
  buildPostRequest,
} from "./utils";
import { getToken } from "./utils/tokenService";

export async function getCategories() {
  return await buildGetRequest(`/categories/`);
}

export async function addCategory(name) {
  return await buildPostRequest(
    "/categories/",
    {
      name,
    },
    { Authorization: "Token " + getToken() }
  );
}

export async function saveCategory(id, name) {
  return await buildPatchRequest(
    "/categories/" + id + "/",
    { name },
    { Authorization: "Token " + getToken() }
  );
}

export async function deleteCategory(id) {
  return await buildDeleteRequest("/categories/" + id + "/", {
    Authorization: "Token " + getToken(),
  });
}

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const loadCategories = async () => {
    try {
      setCategories((await getCategories()).data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return [categories, loadCategories];
}
