import type { MediaItem } from "./types";

export const mockMediaItems: MediaItem[] = [
  {
    id: 1,
    title: "GRIS",
    type: "GAME",
    genre: "Indie",
    releaseYear: 2018,
    creator: "Nomada Studio",
    status: "IN_PROGRESS",
    rating: 10,
    review: "Beautiful, atmospheric, short. Very very good!"
  },
  {
    id: 2,
    title: "The Matrix",
    type: "MOVIE",
    genre: "Sci-Fi",
    releaseYear: 1999,
    creator: "The Wachowskis",
    status: "COMPLETED",
    rating: 8,
    review: "Classic cyberpunk action with deep philosophy."
  },
  {
    id: 3,
    title: "Breaking Bad",
    type: "SHOW",
    genre: "Crime Drama",
    releaseYear: 2008,
    creator: "Vince Gilligan",
    status: "TO_EXPERIENCE",
    rating: 5,
    review: ""
  }
];
