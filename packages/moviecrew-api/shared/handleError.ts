import axios from "axios";
import { reAuthenticateApp } from "../src/auth/service";

export const handleReAuthAndRetry = async <T>(
  fn: () => Promise<T>,
): Promise<T> => {
  try {
    return await fn();
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        await reAuthenticateApp();
      }
    }
    throw error;
  }
};
