import { Movie } from "@movies/shared/types";
import { User } from "@users/shared/types";

interface SpectatorRate {
  ratedMovie: Movie;
  rate: number;
}

export interface Spectator {
  spectator: User;
  rates: SpectatorRate[];
  bestRate: SpectatorRate | null;
  worstRate: SpectatorRate | null;
}
