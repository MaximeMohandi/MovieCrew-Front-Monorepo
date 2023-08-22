import ERROR_MESSAGES from "./errorMessage";
import MovieFetchError from "./movieFetchError";

export default class MovieAlreadyExistError extends MovieFetchError {
  constructor() {
    super(ERROR_MESSAGES.MovieAlereadyExist);
    this.name = "MovieAlreadyExistError";
  }
}
