import config from "../../config";

const MOVIE_API_BASE_URL = config.baseUrl;
export const GET_MOVIES_ENDPOINT = `${MOVIE_API_BASE_URL}/movie/all`;
export const GET_MOVIE_ENDPOINT = `${MOVIE_API_BASE_URL}/movie/details`;
export const GET_RANDOM_MOVIE_ENDPOINT = `${MOVIE_API_BASE_URL}/movie/random`;
export const POST_MOVIE_ENDPOINT = `${MOVIE_API_BASE_URL}/movie/add`;
export const PATCH_MOVIE_TITLE_ENDPOINT = (id: number) =>
  `${MOVIE_API_BASE_URL}/movie/${id}/rename`;
