const MOVIE_API_BASE_URL = "http://localhost:1812/api";
export const GET_MOVIES_ENDPOINT = `${MOVIE_API_BASE_URL}/movies`;
export const GET_MOVIE_ENDPOINT = `${MOVIE_API_BASE_URL}/movie/details`;
export const GET_RANDOM_MOVIE_ENDPOINT = `${MOVIE_API_BASE_URL}/movie/random`;
export const POST_MOVIE_ENDPOINT = `${MOVIE_API_BASE_URL}/movie/add`;
export const PATCH_MOVIE_TITLE_ENDPOINT = (id: number) =>
  `${MOVIE_API_BASE_URL}/movie/${id}/rename`;
