import { PaginationItem } from "@discordx/pagination";
import { fetchSpectator } from "moviecrew-api";
import { spectatorOrError } from "./spectatorResponseWrapper";

export const spectatorDetailsMessage = async ({
  spectatorId,
}: {
  spectatorId: string;
}): Promise<PaginationItem[]> =>
  spectatorOrError(() => fetchSpectator(spectatorId));
