import type { MediaItem, MediaType, ExperienceStatus } from "../types";

const BASE_URL = "http://localhost:8080/api/media-items";

export async function getAllMedia(): Promise<MediaItem[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch media items");
  return res.json();
}

export async function createMediaItem(item: Omit<MediaItem, "id">): Promise<MediaItem> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to create media item");
  return res.json();
}

export async function filterMedia(type: MediaType, status: ExperienceStatus): Promise<MediaItem[]> {
  const url = `${BASE_URL}/filter?type=${type}&status=${status}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch filtered media items");
  return res.json();
}
