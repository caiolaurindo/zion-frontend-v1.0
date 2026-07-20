export interface HistoryItem {
  id: string;
  liked: boolean | null;
  createdAt: string;
  watched: boolean;
  movie: {
    title: string;
    poster: string;
    year: string;
    rating: string;
    director: string;
    runtime: string;
    plot: string;
    actors: string[];
  };
}
