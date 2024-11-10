/**
 * Interface representing authentication context properties.
 *
 * @interface AuthContextProps
 * @property {string | null} userToken - The token representing the authenticated user. It can be a string or null if no user is authenticated.
 * @property {React.Dispatch<React.SetStateAction<string | null>>} setUserToken - Function to update the user token state.
 */
export interface AuthContextProps {
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
}