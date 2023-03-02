import { apiClient } from "api";

export async function buildGetRequest(url, params, headers) {
  return await apiClient.get(url, { params, headers });
}

export async function buildPostRequest(url, data, headers) {
  return await apiClient.post(url, data, { headers });
}

export async function buildPatchRequest(url, data, headers) {
  return await apiClient.patch(url, data, { headers });
}

export async function buildPutRequest(url, data, headers) {
  return await apiClient.put(url, data, { headers });
}

export async function buildDeleteRequest(url, headers) {
  return await apiClient.delete(url, { headers });
}
