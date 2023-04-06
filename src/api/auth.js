import Router from "next/router";
import React, { useState, useContext, createContext } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from "@apollo/client";
import client from "./apollo-client";
const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null);

  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: "http://localhost:3000/api/graphql",
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  const signIn = async ({ email, password }) => {
    const client = createApolloClient();
    const LoginQuery = gql`
      query {
        login(email: $email, password: $password) {
          token
        }
      }
    `;

    const result = await client.mutate({
      mutation: LoginQuery,
      variables: { email, password },
    });

    console.log(result);

    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token);
    }
  };

  const signOut = () => {
    setAuthToken(null);
  };

  return {
    setAuthToken,
    isSignedIn,
    signIn,
    signOut,
    createApolloClient,
  };
}

export function useAdminGuard(isAdmin) {
  useEffect(() => {
    if (!isAdmin) {
      Router.push({ pathname: "/" });
    }
  }, []);
}

export function useLoginGuard(isAuthenticated) {
  useEffect(() => {
    if (isAuthenticated) {
      Router.push({ pathname: "/ " });
    }
  });
}

export async function signUp({
  firstName,
  lastName,
  email,
  password,
  passwordConfirmation,
}) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation CreateUser($input: RegisterInput!) {
        createUser(input: $input) {
          id
        }
      }
    `,
    variables: {
      input: {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
      },
    },
  });

  return data;
}
