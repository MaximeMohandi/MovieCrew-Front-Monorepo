const SPECTATOR_API_BASE_URL = "http://localhost:1812/api/spectators";
export const GET_SPECTATORS_DETAILS = (spectatorId: string) =>
  `${SPECTATOR_API_BASE_URL}/${spectatorId}/details`;
