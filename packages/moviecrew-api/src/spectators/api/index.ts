import axios, { AxiosError } from "axios";
import { handleReAuthAndRetry } from "../../../shared/handleError";
import {
  NoSpectatorFoundError,
  NotASpectatorError,
  SpectatorError,
} from "../errors";
import { Spectator } from "../shared/types";
import { GET_SPECTATORS_DETAILS_ENDPOINT } from "./endpoints";

export const getSpectators = async (spectatorId: string): Promise<Spectator> =>
  handleReAuthAndRetry(async () => {
    try {
      const response = await axios.get<Spectator>(
        GET_SPECTATORS_DETAILS_ENDPOINT(spectatorId),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new NoSpectatorFoundError();
        }

        if (error.response?.status === 401) {
          throw new NotASpectatorError();
        }
      }

      throw new SpectatorError();
    }
  });
