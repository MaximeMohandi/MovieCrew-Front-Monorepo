import ERROR_MESSAGES from "./errorMessage";
import MovieError from "./movieError";

export default class UpdateMovieError extends MovieError {
  constructor(message?: string) {
    super(message || ERROR_MESSAGES.UpdateMovieFailed);
    this.name = "UpdateMovieError";
  }
}
