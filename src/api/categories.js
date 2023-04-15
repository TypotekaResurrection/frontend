import { useEffect, useState } from "react";
import {
  buildDeleteRequest,
  buildGetRequest,
  buildPatchRequest,
  buildPostRequest,
} from "./utils";
import { getToken } from "./utils/tokenService";
import { gql } from "@apollo/client";

export const getCategoriesQuery = gql`
  query GetCategories {
    getCategories {
      id
      name
    }
  }
`;

export const createCategoryMutation = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
    }
  }
`;

export const updateCategoryMutation = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      id
      name
    }
  }
`;

export const deleteCategoryMutation = gql`
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      success
    }
  }
`;

export async function getCategories(client) {
  return (await client.query({ query: getCategoriesQuery })).data.getCategories;
}

export async function addCategory(client, name) {
  return (
    await client.mutate({
      mutation: createCategoryMutation,
      variables: { input: { name } },
    })
  ).data.createCategory;
}

export async function saveCategory(client, id, name) {
  return (
    await client.mutate({
      mutation: updateCategoryMutation,
      variables: { input: { name, id } },
    })
  ).data.updateCategory;
}

export async function deleteCategory(client, id) {
  return (
    await client.mutate({
      mutation: deleteCategoryMutation,
      variables: { id },
    })
  ).data.deleteCategory;
}
