import type { User } from "../../users";

export interface Movie {
  id: number;
  title: string;
  poster: string;
  description: string;
  dateAdded: Date;
  viewingDate: Date | null;
  averageRate: number | null;
}

export interface MovieRate {
  rate: number;
  ratedBy: User;
}

export interface MovieDetailled extends Movie {
  averageRate: number | null;
  peopleAverageRate: number | null;
  revenue: number | null;
  budget: number | null;
  movieRates: MovieRate[];
  bestRate: MovieRate | null;
  worstRate: MovieRate | null;
  proposedBy: User;
}
