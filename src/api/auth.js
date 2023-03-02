import Router from "next/router";
import { useEffect, useState } from "react";
import { buildPostRequest } from "./utils";
import { isAdmin, isAuthenticated } from "./utils/tokenService";

export async function getToken(email, password) {
  return await buildPostRequest("/user/token/", { email, password });
}

export async function signup(email, name, surname, password, repeatPassword) {
  return await buildPostRequest("/user/create/", {
    email,
    first_name: name,
    last_name: surname,
    password,
    password2: repeatPassword,
  });
}

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setAdmin(isAdmin());
  }, []);

  return [authenticated, admin];
}

export function useAdminGuard() {
  useEffect(() => {
    if (!isAdmin()) {
      Router.push({ pathname: "/" });
    }
  }, []);
}

export function useLoginGuard() {
  useEffect(() => {
    if (isAuthenticated()) {
      Router.push({ pathname: "/ " });
    }
  });
}
