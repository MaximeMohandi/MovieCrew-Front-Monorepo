import axios from "axios";
import { getToken } from "../api";

export const authenticateApp = async (
  clientId: number,
  secret: string,
): Promise<Date> => {
  const { token, expirationDate } = await getToken(clientId, secret);
  axios.defaults.headers.common.Authorization = token;
  return expirationDate;
};
