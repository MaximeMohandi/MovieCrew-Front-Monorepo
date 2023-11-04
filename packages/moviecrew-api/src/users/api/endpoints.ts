import config from "../../config";

const USER_BASE_URL = config.baseUrl;
export const LOGIN_USER_ENDPOINT = `${USER_BASE_URL}/user/login`;
export const REGISTER_USER_ENDPOINT = `${USER_BASE_URL}/user/register`;
