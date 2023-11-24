import axios, { AxiosError } from "axios";
import { AuthenticationError, InvalidCredentialError } from "../errors";
import { GET_TOKEN_ENDPOINT } from "./endpoints";

export const getToken = async (
  clientId: number,
  secret: string,
): Promise<{ token: string; expirationDate: Date }> => {
  try {
    const response = await axios.get<{ token: string; expirationDate: Date }>(
      GET_TOKEN_ENDPOINT,
      {
        headers: {
          ApiKey: secret,
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
