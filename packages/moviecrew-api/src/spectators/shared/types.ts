import { Movie } from "../../movies";
import { User } from "../../users";

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
