import {
  NoSpectatorFoundError,
  NotASpectatorError,
  SpectatorError,
} from "@spectators/errors";
import { Spectator } from "@spectators/shared/types";
import axios, { AxiosError } from "axios";
import { GET_SPECTATORS_DETAILS } from "./endpoints";

export const getSpectators = async (
  spectatorId: string,
): Promise<Spectator> => {
  try {
    const response = await axios.get<Spectator>(
      GET_SPECTATORS_DETAILS(spectatorId),
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
};
