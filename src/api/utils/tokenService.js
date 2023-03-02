export function setToken(tokenInfo) {
  window.localStorage.setItem("token", JSON.stringify(tokenInfo));
}

export function resetToken() {
  window.localStorage.setItem("token", "");
}

export function getToken() {
  const token = window.localStorage.getItem("token");
  return token ? JSON.parse(token)?.token ?? "" : "";
}

export function isAdmin() {
  const token = window.localStorage.getItem("token");
  return token ? JSON.parse(token)?.is_admin ?? "" : false;
}

export function isAuthenticated() {
  return getToken() !== "";
}
