import config from "../../config";

const SPECTATOR_API_BASE_URL = `${config.baseUrl}/spectators`;
export const GET_SPECTATORS_DETAILS = (spectatorId: string) =>
  `${SPECTATOR_API_BASE_URL}/${spectatorId}/details`;
