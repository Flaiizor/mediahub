export interface MediaItem {
  id: number;
  title: string;
  type: MediaType;
  genre: string;
  releaseYear: number;
  creator: string;
  status: ExperienceStatus;
  review: string;
}

export const mediaTypes = ["MOVIE", "SHOW", "GAME", "BOOK"] as const;
export type MediaType = (typeof mediaTypes)[number];

export const experienceStatuses = ["TO_EXPERIENCE", "IN_PROGRESS", "COMPLETED"] as const;
export type ExperienceStatus = (typeof experienceStatuses)[number];

