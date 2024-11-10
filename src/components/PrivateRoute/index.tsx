import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { isTokenExpired } from "../../utils";

/**
 * A component that restricts access to its children based on user authentication.
 *
 * This component uses the `useAuth` hook to retrieve the user's token and
 * the `useNavigate` hook from React Router to navigate to an error page if the token is either
 * missing or expired. If the token is valid, it renders the children components via an `Outlet`.
 *
 * @return {JSX.Element|null} Returns the rendered children components if the user is authenticated, otherwise returns null.
 */
export const PrivateRoute: React.FC = () => {
  const { userToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken || isTokenExpired(userToken)) {
      navigate("/error");
    }

  }, [userToken, navigate]);

  if (!userToken || isTokenExpired(userToken)) {
    return null;
  }

  return <Outlet />
}