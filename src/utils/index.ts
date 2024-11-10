import { jwtDecode } from "jwt-decode";
import { DecodeTokenProps } from "../interfaces/DecodeTokenProps";

/**
 * Determines if a given JWT token has expired.
 *
 * @param {string} token - The JWT token to check.
 * @returns {boolean} Returns true if the token has expired, otherwise false.
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded: DecodeTokenProps = jwtDecode(token);
  const now = Date.now() / 1000;
  return decoded.exp < now;
}