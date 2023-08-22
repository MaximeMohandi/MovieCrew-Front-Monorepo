import {
  AddMovieError,
  MovieAlreadyExistError,
  MovieFetchError,
  NoMovieFoundError,
} from "@movies/errors";
import {
  GET_MOVIES_ENDPOINT,
  GET_MOVIE_ENDPOINT,
  GET_RANDOM_MOVIE_ENDPOINT,
  POST_MOVIE_ENDPOINT,
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
      throw new MovieFetchError();
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
      throw new MovieFetchError();
    }
  }
};

export const fetchRandomMovie = async (): Promise<Movie | null> => {
  try {
    const response = await axios.get<Movie>(GET_RANDOM_MOVIE_ENDPOINT);
    if (response.status === 204) {
      return null;
    }
    return response.data;
  } catch (error) {
    throw new MovieFetchError();
  }
};

export const postNewMovie = async (
  title: string,
  proposedBy: string,
): Promise<number> => {
  try {
    const response = await axios.post<number>(POST_MOVIE_ENDPOINT, {
      title,
      proposedBy,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response?.status === 409) {
      throw new MovieAlreadyExistError();
    } else {
      throw new AddMovieError();
    }
  }
};
