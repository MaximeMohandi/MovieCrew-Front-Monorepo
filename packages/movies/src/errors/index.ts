export class MovieError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MovieError";
  }
}

export class NoMovieFoundError extends MovieError {
  constructor() {
    super("No movie found");
    this.name = "NoMovieFoundError";
  }
}
