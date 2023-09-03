/* eslint-disable max-classes-per-file */
import ERROR_MESSAGES from "./errorMesssages";

export { ERROR_MESSAGES };

export class SpectatorError extends Error {
  constructor(message?: string) {
    if (message === undefined) super(ERROR_MESSAGES.FetchSpectatorsError);
    else super(message);
    this.name = "SpectatorError";
  }
}

export class NoSpectatorFoundError extends SpectatorError {
  constructor() {
    super(ERROR_MESSAGES.NoSpectatorFoundError);
    this.name = "NoSpectatorFoundError";
  }
}

export class NotASpectatorError extends SpectatorError {
  constructor() {
    super(ERROR_MESSAGES.NotASpectatorError);
    this.name = "NotASpectatorError";
  }
}
