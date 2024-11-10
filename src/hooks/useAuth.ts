import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { AuthContextProps } from "../interfaces/AuthContextProps";

/**
 * A hook that provides access to the authentication context.
 *
 * This hook must be used within an `AuthProvider`. If used outside of an `AuthProvider`,
 * it will throw an error.
 *
 * @return {AuthContextProps} The authentication context properties.
 * @throws {Error} If the hook is used outside of an `AuthProvider`.
 */
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}