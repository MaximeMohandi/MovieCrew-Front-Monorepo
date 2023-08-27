import { LoginError } from "@users/error";
import { User } from "@users/shared/types";
import axios, { AxiosError } from "axios";
import { LOGIN_USER_ENDPOINT } from "./endpoints";

export const loginUser = async (
  userId: number,
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

// export const getUser = async (userId: string): Promise<User> => {};
