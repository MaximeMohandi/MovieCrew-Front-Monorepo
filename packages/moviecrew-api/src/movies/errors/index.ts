/* eslint-disable max-classes-per-file */
import ERROR_MESSAGES from "./errorMessage";

export { ERROR_MESSAGES };

export class MovieError extends Error {
  constructor(message?: string) {
    if (message === undefined) super(ERROR_MESSAGES.GenericError);
    else super(message);
    this.name = "MovieError";
  }
}

export class MovieFetchError extends MovieError {
  constructor(message?: string) {
    if (message === undefined) super(ERROR_MESSAGES.FailedToFetchMovie);
    else super(message);
    this.name = "MovieFetchError";
  }
}

export class AddMovieError extends MovieError {
  constructor(message?: string) {
    super(message || ERROR_MESSAGES.AddMovieFailed);
    this.name = "AddMovieError";
  }
}

export class UpdateMovieError extends MovieError {
  constructor(message?: string) {
    super(message || ERROR_MESSAGES.UpdateMovieFailed);
    this.name = "UpdateMovieError";
  }
}

export class NoMovieFoundError extends MovieFetchError {
  constructor() {
    super(ERROR_MESSAGES.NoMovieFound);
    this.name = "NoMovieFoundError";
  }
}

export class UnseenMoviesNotFound extends MovieFetchError {
  constructor() {
    super(ERROR_MESSAGES.UnseenMoviesNotFound);
    this.name = "UnseenMoviesNotFound";
  }
}

export class MovieAlreadyExistError extends MovieFetchError {
  constructor() {
    super(ERROR_MESSAGES.MovieAlereadyExist);
    this.name = "MovieAlreadyExistError";
  }
}
