import axios from "axios";
import { getToken } from "../api";

export const authenticateApp = async (
  apiUrl: string,
  clientId: number,
  secret: string,
): Promise<Date> => {
  axios.defaults.baseURL = apiUrl;
  const { token, expirationDate } = await getToken(clientId, secret);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return expirationDate;
};
