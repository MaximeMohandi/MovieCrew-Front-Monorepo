import axios from "axios";
import { handleReAuthAndRetry } from "../../../shared/handleError";
import RateError from "../error";
import POST_RATE_MOVIE_ENDPOINT from "./endpoints";

export const rateMovie = async (
  idMovie: number,
  idUserRatingMovie: string,
  rating: number,
): Promise<string> =>
  handleReAuthAndRetry(async () => {
    try {
      const response = await axios.post(POST_RATE_MOVIE_ENDPOINT, {
        idMovie,
        userId: idUserRatingMovie,
        rate: rating,
      });
      if (response.status !== 201) throw new RateError();
      return response.data;
    } catch (error) {
      throw new RateError();
    }
  });
