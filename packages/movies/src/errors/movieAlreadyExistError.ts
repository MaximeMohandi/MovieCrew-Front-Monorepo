import ERROR_MESSAGES from "./errorMessage";
import MovieError from "./movieError";

export default class MovieAlreadyExistError extends MovieError {
  constructor() {
    super(ERROR_MESSAGES.MovieAlereadyExist);
    this.name = "MovieAlreadyExistError";
  }
}
