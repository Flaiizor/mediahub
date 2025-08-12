import type { MediaItem, MediaType, ExperienceStatus } from "../types";

const BASE_URL = "http://localhost:8080/api/media-items";

export async function createMediaItem(item: Omit<MediaItem, "id">): Promise<MediaItem> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to create media item");
  return res.json();
}

export async function getAllMedia(): Promise<MediaItem[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch media items");
  return res.json();
}

export async function getMediaById(id: number) {
  const res = await fetch(`${BASE_URL}/id/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch media item with id ${id}`);
  return res.json();
}

export async function updateMediaItem(id: number, item: Omit<MediaItem, "id">): Promise<MediaItem> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error(`Failed to update media item with id ${id}`);
  return res.json();
}

export async function deleteMediaItem(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete media item with id ${id}`);
}

export interface MediaItemFilters {
  title?: string;
  type?: MediaType;
  genre?: string;
  creator?: string;
  rating?: number;
  status?: ExperienceStatus;
}

export async function filterMediaItems(filters: MediaItemFilters = {}): Promise<MediaItem[]> {
  const params = new URLSearchParams();
  
  // Add parameters only if they have meaningful values
  if (filters.title?.trim()) {
    params.append("title", filters.title.trim());
  }
  
  if (filters.type) {
    params.append("type", filters.type);
  }
  
  if (filters.genre?.trim()) {
    params.append("genre", filters.genre.trim());
  }
  
  if (filters.creator?.trim()) {
    params.append("creator", filters.creator.trim());
  }
  
  if (filters.rating !== undefined && filters.rating !== null) {
    params.append("rating", filters.rating.toString());
  }
  
  if (filters.status) {
    params.append("status", filters.status);
  }
  
  const url = params.toString() ? `${BASE_URL}/filter?${params.toString()}` : `${BASE_URL}/filter`;
  
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch filtered media items: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

/**
 * Checks if a media item with the given title already exists.
 * Useful before creating a new media item to avoid duplicates.
 * @param title - The title to check for
 * @returns true if the title exists, false otherwise
 */
export async function mediaItemExistsByTitle(title: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/exists?title=${encodeURIComponent(title)}`);
  if (!res.ok) {
    throw new Error(`Failed to check if media item exists with title: ${title}`);
  }
  return res.json();
}
