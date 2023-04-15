import { useAuth } from "@api/auth";
import Router from "next/router";
import { useEffect } from "react";

function Exit() {
  const { signOut } = useAuth();
  useEffect(() => {
    signOut();
    Router.push({ pathname: "/login" });
  }, []);
}

export default Exit;
