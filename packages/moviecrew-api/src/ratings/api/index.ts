import axios, { AxiosError } from "axios";
import { getMovie } from "../../movies";
import RateError from "../error";
import POST_RATE_MOVIE_ENDPOINT from "./endpoints";

export const rateMovie = async (
  movieName: string,
  idUserRatingMovie: string,
  rating: number,
): Promise<string> => {
  try {
    const { id } = await getMovie({ title: movieName });
    const response = await axios.post(POST_RATE_MOVIE_ENDPOINT, {
      idMovie: id,
      userId: idUserRatingMovie,
      rate: rating,
    });
    if (response.status !== 201) throw new RateError();
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400)
      throw new Error(error.response?.data.message);
    throw new RateError();
  }
};
