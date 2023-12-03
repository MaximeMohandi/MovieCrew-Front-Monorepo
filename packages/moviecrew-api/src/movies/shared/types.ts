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
  proposedBy: User | null;
}

export enum SortOptions {
  RATE = "rate",
  DATE_ADDED = "dateAdded",
  TITLE = "title",
  VIEWING_DATE = "viewingDate",
}

export type SortBy = `${SortOptions}`; // "map sort options to string literal type"
export enum OrderOptions {
  ASCENDING = "asc",
  DESCENDING = "desc",
}
export type OrderBy = `${OrderOptions}`;
