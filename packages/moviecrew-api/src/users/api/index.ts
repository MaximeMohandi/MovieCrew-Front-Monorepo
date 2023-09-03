import { LoginError, RegisterUserError } from "@users/error";
import { User } from "@users/shared/types";
import axios, { AxiosError } from "axios";
import { LOGIN_USER_ENDPOINT, REGISTER_USER_ENDPOINT } from "./endpoints";

export const loginUser = async (
  userId: string,
  userName: string,
): Promise<User> => {
  try {
    const response = await axios.get<User>(LOGIN_USER_ENDPOINT, {
      params: {
        userId,
        userName,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404)
      throw new LoginError(error.response?.data.message);

    throw new LoginError();
  }
};

export const registerUser = async (
  userId: number,
  username: string,
  role: number,
): Promise<string> => {
  try {
    const response = await axios.post<string>(REGISTER_USER_ENDPOINT, {
      params: {
        id: userId,
        name: username,
        role,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 409)
      throw new RegisterUserError(error.response?.data.message);
    throw new RegisterUserError();
  }
};
