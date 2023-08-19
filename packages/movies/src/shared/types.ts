export type Movie = {
  id: number;
  title: string;
  poster: string;
  description: string;
  dateAdded: string;
  viewingDate: Date | null;
  averageRate: number | null;
};