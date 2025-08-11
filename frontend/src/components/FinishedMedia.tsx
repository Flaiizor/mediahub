import React, { useEffect, useState } from "react";
import { filterMediaItems } from "../api/mediaItemAPI";
import type { MediaItem } from "../types";

export default function FinishedMedia() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    filterMediaItems({ status: "COMPLETED" })
      .then(setMediaItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (mediaItems.length === 0) return <div>No media marked as done.</div>;

  return (
    <div>
      <h2>Finished Media</h2>
      <ul>
        {mediaItems.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> ({item.type}) - {item.genre} {item.releaseYear && `- ${item.releaseYear}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
