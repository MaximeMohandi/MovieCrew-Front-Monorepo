import { PaginationItem } from "@discordx/pagination";
import { Spectator, SpectatorError } from "moviecrew-api";
import { spectatorErrorMessage, spectatorMessage } from "./spectatorMessage";

export const spectatorOrError = async (
  spectatorFetcher: () => Promise<Spectator>,
): Promise<PaginationItem[]> => {
  try {
    const spectator = await spectatorFetcher();

    return spectatorMessage(spectator);
  } catch (error) {
    if (error instanceof SpectatorError) {
      return [spectatorErrorMessage(error.message)];
    }

    throw error;
  }
};
