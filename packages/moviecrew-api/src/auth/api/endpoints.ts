import config from "../../config";

const AUTH_API_BASE_URL = config.baseUrl;
export const GET_TOKEN_ENDPOINT = `${AUTH_API_BASE_URL}/authentication/token`;
