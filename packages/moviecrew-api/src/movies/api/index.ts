import axios from "axios";
import { handleReAuthAndRetry } from "../../../shared/handleError";
import {
  AddMovieError,
  ERROR_MESSAGES,
  MovieAlreadyExistError,
  MovieFetchError,
  NoMovieFoundError,
  UpdateMovieError,
} from "../errors";
import type { Movie, MovieDetailled } from "../shared/types";
import {
  GET_MOVIES_ENDPOINT,
  GET_MOVIE_ENDPOINT,
  GET_RANDOM_MOVIE_ENDPOINT,
  PATCH_MOVIE_TITLE_ENDPOINT,
  POST_MOVIE_ENDPOINT,
} from "./endpoints";

export const fetchMovies = async (): Promise<Movie[]> =>
  handleReAuthAndRetry(async () => {
    try {
      const response = await axios.get<Movie[]>(GET_MOVIES_ENDPOINT);
      return response.data.map((movie) => ({
        ...movie,
        dateAdded: new Date(movie.dateAdded),
        viewingDate: movie.viewingDate ? new Date(movie.viewingDate) : null,
      }));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new NoMovieFoundError();
      } else {
        throw new MovieFetchError();
      }
    }
  });

export const fetchMovie = async ({
  id = undefined,
  title = undefined,
}: {
  id?: number;
  title?: string;
}): Promise<MovieDetailled> =>
  handleReAuthAndRetry(async () => {
    try {
      const response = await axios.get<MovieDetailled>(GET_MOVIE_ENDPOINT, {
        params: id ? { id } : { title },
      });
      return {
        ...response.data,
        dateAdded: new Date(response.data.dateAdded),
        viewingDate: response.data.viewingDate
          ? new Date(response.data.viewingDate)
          : null,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new NoMovieFoundError();
      } else {
        throw new MovieFetchError();
      }
    }
  });

export const fetchRandomMovie = async (): Promise<Movie | null> =>
  handleReAuthAndRetry(async () => {
    try {
      const response = await axios.get<Movie>(GET_RANDOM_MOVIE_ENDPOINT);
      if (response.status === 204) {
        return null;
      }
      return response.data;
    } catch (error) {
      throw new MovieFetchError();
    }
  });

export const postNewMovie = async (
  title: string,
  proposedBy: string,
): Promise<number> =>
  handleReAuthAndRetry(async () => {
    try {
      const response = await axios.post<number>(POST_MOVIE_ENDPOINT, {
        title,
        proposedBy,
      });

      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        throw new MovieAlreadyExistError();
      } else {
        throw new AddMovieError();
      }
    }
  });

export const updateMovieTitle = async (id: number, title: string) =>
  handleReAuthAndRetry(async () => {
    try {
      await axios.put<boolean>(PATCH_MOVIE_TITLE_ENDPOINT(id), {
        newTitle: title,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409)
        throw new UpdateMovieError(ERROR_MESSAGES.MovieAlereadyExist);

      throw new UpdateMovieError();
    }
  });
