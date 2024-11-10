import React, { createContext, useState, useEffect } from "react";
import { AuthContextProps } from "../interfaces/AuthContextProps";
import { AuthProviderProps } from "../interfaces/AuthProviderProps";

/**
 * AuthContext is a context object created using React's createContext.
 * It provides an authentication context that can be used throughout a
 * React component tree.
 *
 * The context contains authentication state and any associated authentication
 * methods, defined by AuthContextProps, allowing decoupled use of authentication data and
 * operations in various parts of the application.
 *
 * By default, it is initialized to undefined and should be provided with a value
 * at a higher level in the component tree, usually through a context provider.
 *
 * @type {React.Context<AuthContextProps | undefined>}
 */
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

/**
 * A React functional component that provides authentication context to its child components.
 *
 * @param {AuthProviderProps} props - The properties object for AuthProvider.
 * @param {ReactNode} props.children - The child components that will have access to the authentication context.
 *
 * @returns {JSX.Element} The context provider component with authentication state.
 *
 * The AuthProvider component manages a user token state and persists it in local storage.
 * It reads the initial token value from local storage, and updates local storage whenever the token changes.
 * The context provides the current token and a function to update the token.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem("userToken")
  );

  useEffect(() => {
    if (userToken) {
      localStorage.setItem("userToken", userToken);
    } else {
      localStorage.removeItem("userToken");
    }
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};
