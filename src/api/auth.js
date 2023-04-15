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
import { useEffect } from "react";
const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  useEffect(() => {
    if (getTokenFromStorage() && !auth.isSignedIn()) {
      auth.initSavedToken();
    }

    return () => {
      auth.setupStaff();
    };
  }, [auth]);

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
  const [isStaff, setIsStaff] = useState(false);

  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  const setupStaff = async () => {
    const newClient = createApolloClient();

    const isStaffQuery = gql`
      query GetUserInfo {
        getUserInfo {
          isStaff
        }
      }
    `;

    try {
      const isStaffResult = await newClient.query({ query: isStaffQuery });
      if (isStaffResult?.data?.getUserInfo?.isStaff) {
        setIsStaff(true);
      }
    } catch (e) {}
  };

  const initSavedToken = async () => {
    setAuthToken(getTokenFromStorage());
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
      query Login($input: LoginInput!) {
        login(input: $input)
      }
    `;

    const result = await client.query({
      query: LoginQuery,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    console.log(result);

    if (result?.data?.login) {
      await setAuthToken(result.data.login);
      setTokenInStorage(result.data.login);
      await setupStaff();
    }
  };

  const signOut = () => {
    setAuthToken(null);
    setTokenInStorage(null);
    setIsStaff(false);
  };

  return {
    setAuthToken,
    isSignedIn,
    isStaff,
    signIn,
    signOut,
    createApolloClient,
    initSavedToken,
    setupStaff,
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

export function getTokenFromStorage() {
  return window.localStorage.getItem("token");
}

export function setTokenInStorage(token) {
  window.localStorage.setItem("token", token);
}
