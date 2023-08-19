export class MovieError extends Error {
  constructor(message?: string) {
    if (message === undefined) super(ERROR_MESSAGES.FailedToFetchMovie);
    else super(message);
    this.name = "MovieError";
  }
}

export class NoMovieFoundError extends MovieError {
  constructor() {
    super(ERROR_MESSAGES.NoMovieFound);
    this.name = "NoMovieFoundError";
  }
}

export const ERROR_MESSAGES = {
  NoMovieFound: "No movie found",
  FailedToFetchMovie: "Failed to fetch movie",
  EitherIdOrTitleShouldBeProvided: "Either id or title should be provided",
};
