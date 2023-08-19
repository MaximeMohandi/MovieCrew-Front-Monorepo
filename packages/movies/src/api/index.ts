import axios, { AxiosError } from "axios";
import { GET_MOVIES_ENDPOINT } from "@movies/shared/constants";
import { NoMovieFoundError, MovieError } from "@movies/errors";
import type { Movie } from "@movies/shared/types";

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    let response = await axios.get<Movie[]>(GET_MOVIES_ENDPOINT);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      throw new NoMovieFoundError();
    } else {
      throw new MovieError(
        "Failed to fetch movies: " + (error as Error).message
      );
    }
  }
};
