import { MovieError, NoMovieFoundError } from "@movies/errors";
import {
  GET_MOVIES_ENDPOINT,
  GET_MOVIE_ENDPOINT,
} from "@movies/shared/constants";
import type { Movie, MovieDetailled } from "@movies/shared/types";
import axios, { AxiosError } from "axios";

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get<Movie[]>(GET_MOVIES_ENDPOINT);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      throw new NoMovieFoundError();
    } else {
      throw new MovieError();
    }
  }
};

export const fetchMovie = async ({
  id = undefined,
  title = undefined,
}: {
  id?: number;
  title?: string;
}): Promise<MovieDetailled> => {
  try {
    const response = await axios.get<MovieDetailled>(GET_MOVIE_ENDPOINT, {
      params: id ? { id } : { title },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      throw new NoMovieFoundError();
    } else {
      throw new MovieError();
    }
  }
};
