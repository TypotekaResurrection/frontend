import "@styles/normalize.scss";
import "@styles/main.scss";
import { ApolloProvider } from "@apollo/client";
import client from "@api/apollo-client";
import React from "react";
import { AuthProvider } from "@api/auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
