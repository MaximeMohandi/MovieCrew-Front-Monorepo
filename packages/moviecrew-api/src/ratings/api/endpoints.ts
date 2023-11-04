import config from "../../config";

const RATING_API_BASE_URL = config.baseUrl;
const POST_RATE_MOVIE_ENDPOINT = `${RATING_API_BASE_URL}/movie/rate`;

export default POST_RATE_MOVIE_ENDPOINT;
