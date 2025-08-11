export interface MediaItem {
  id: number;
  title: string;
  type: MediaType;
  genre: string | undefined;
  releaseYear: number | undefined;
  creator: string | undefined;
  status: ExperienceStatus;
  rating: number | undefined;
  review: string | undefined;
}

export const mediaTypes = ["MOVIE", "SHOW", "GAME", "BOOK"] as const;
export type MediaType = (typeof mediaTypes)[number];

export const experienceStatuses = ["TO_EXPERIENCE", "IN_PROGRESS", "COMPLETED"] as const;
export type ExperienceStatus = (typeof experienceStatuses)[number];

