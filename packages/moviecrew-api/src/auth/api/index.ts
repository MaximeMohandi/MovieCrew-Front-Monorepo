import { AuthenticationError, InvalidCredentialError } from "@auth/errors";
import axios, { AxiosError } from "axios";
import { GET_TOKEN_ENDPOINT } from "./endpoints";

export const authenticateApp = async (
  clientId: number,
  secret: string,
): Promise<{ token: string; expirationDate: number }> => {
  try {
    const response = await axios.get<{ token: string; expirationDate: number }>(
      GET_TOKEN_ENDPOINT,
      {
        headers: {
          Authorization: `ApiKey ${secret}`,
        },
        params: {
          clientId,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 403) {
      throw new InvalidCredentialError();
    } else {
      throw new AuthenticationError();
    }
  }
};
