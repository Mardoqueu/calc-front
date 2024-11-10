import { UserProps } from "../interfaces/UserProps";
import { toast } from "react-toastify";

const API_URL = "https://gateway-api-d161ff47e128.herokuapp.com";

/**
 * Creates a new user by sending a POST request to the registration endpoint.
 *
 * @param {Object} user - The user data.
 * @param {string} user.userName - The username of the new user.
 * @param {string} user.password - The password for the new user.
 * @return {Promise<void>} A promise that resolves when the user is successfully created, or rejects with an error message.
 */
export async function createUser({ userName, password }: UserProps) {
  try {
    const user = {
      userName,
      password,
    };

    const optionsRequest = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${API_URL}/auth/register`, optionsRequest);

    if (response.ok) {
      await response.json();
      toast.success("User created successfully!");

      return;
    }

    throw new Error();
  } catch (error) {
    console.log("Error creating a user", error);
    toast.error("Error creating a user");
  }
}

/**
 * Logs in a user with the provided credentials.
 *
 * @param {Object} params - Object containing user login credentials.
 * @param {string} params.userName - The username of the user.
 * @param {string} params.password - The password of the user.
 * @return {Object|undefined} The user data if login is successful, or undefined if an error occurs.
 */
export async function login({ userName, password }: UserProps) {
  try {
    const user = {
      userName,
      password,
    };

    const optionsRequest = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${API_URL}/auth/login`, optionsRequest);

    if (response.status === 200 || response.status === 201) {
      return await response.json();
    }

    throw new Error(
      `An error occurred while logging in: ${response.statusText}`
    );
  } catch (error) {
    console.log("An error occurred while logging in", error);
  }
}

/**
 * Executes a specified operation for a given user.
 *
 * @param {number} userId - The unique identifier of the user.
 * @param {string} operation - The operation expression to be calculated.
 * @return {Promise<object>} A promise that resolves with the operation result or rejects with an error message.
 */
export async function calculateOperation(userId: number, operation: string) {
  try {
    const operations = {
      userId,
      expression: operation,
    };

    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      return toast.error("Unable to get user token");
    }

    const optionsRequest = {
      method: "POST",
      body: JSON.stringify(operations),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await fetch(
      `${API_URL}/operations/execute`,
      optionsRequest
    );

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
  } catch (error) {
    console.log("An error occurred when trying to calculate operation", error);
    toast.error(
      `An error occurred when trying to calculate operation ${error}`
    );
  }
}

/**
 * Generates a random string for the authenticated user.
 * This function retrieves the user token and user ID from localStorage,
 * and makes a POST request to the API to generate the random string.
 * If the request is successful, the random string is returned.
 * Otherwise, an error message is displayed.
 *
 * @return {Promise<string|undefined>} A promise that resolves to the randomly generated string if successful,
 * or undefined if an error occurs.
 */
export async function generateRandomString() {
  try {
    const userToken = localStorage.getItem("userToken");
    const userId = Number(localStorage.getItem("userId"));

    if (!userToken) {
      toast.error("Unable to get user token");
      return;
    }

    const optionsRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await fetch(
      `${API_URL}/operations/random-string?userId=${userId}`,
      optionsRequest
    );

    if (response.ok) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
  } catch (error) {
    console.log("An error occurred while generating the random string", error);
    toast.error(
      `An error occurred while generating the random string ${error}`
    );
    return;
  }
}

export async function currentBalance() {
  try {
    const userToken = localStorage.getItem("userToken");
    const userId = Number(localStorage.getItem("userId"));

    if (!userToken) {
      toast.error("Unable to get user token");
      return;
    }

    if (!userId) {
      toast.error("Unable to get userId");
      return;
    }

    const optionsRequest = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await fetch(`${API_URL}/users/balance?userId=${userId}`, optionsRequest);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
  } catch (error) {
    console.log("An error occurred while getting the current balance", error);
    toast.error(
      `An error occurred while getting the current balance ${error}`
    );
    return;
  }
}
