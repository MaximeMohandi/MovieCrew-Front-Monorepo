import axios from "axios";
import { getToken } from "../api";

const authData: {
  clientId?: number;
  secret?: string;
} = {};

const authenticateAppFromAuthData = async () => {
  const { token, expirationDate } = await getToken(
    authData.clientId!,
    authData.secret!,
  );
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return expirationDate;
};

export const authenticateApp = async (
  apiUrl: string,
  clientId: number,
  secret: string,
): Promise<Date> => {
  authData.clientId = clientId;
  authData.secret = secret;
  axios.defaults.baseURL = apiUrl;

  return await authenticateAppFromAuthData();
};

export const reAuthenticateApp = async (): Promise<Date> =>
  await authenticateAppFromAuthData();
