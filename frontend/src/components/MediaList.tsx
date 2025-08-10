import React, { useState, useEffect } from "react";
import type { MediaItem, MediaType, ExperienceStatus } from "../types";
import { mediaTypes, experienceStatuses } from "../types";
import { getAllMedia } from "../api/mediaItemAPI";
import MediaForm from "./MediaForm";

const MediaList: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [filterType, setFilterType] = useState<MediaType | "">("");
  const [filterStatus, setFilterStatus] = useState<ExperienceStatus | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllMedia()
      .then(setMediaItems)
      .catch(() => setError("Failed to load media items"))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (newItem: MediaItem) => {
    setMediaItems((prev) => [...prev, newItem]);
  };

  const filteredItems = mediaItems.filter((item) => {
    return (
      (filterType === "" || item.type === filterType) &&
      (filterStatus === "" || item.status === filterStatus)
    );
  });

  if (loading) return <p>Loading media items...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Media List</h2>

      <MediaForm onAdd={handleAdd} />

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Type:{" "}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as MediaType | "")}
          >
            <option value="">All</option>
            {mediaTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: "1rem" }}>
          Status:{" "}
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as ExperienceStatus | "")
            }
          >
            <option value="">All</option>
            {experienceStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul>
        {filteredItems.length === 0 ? (
          <li>No items match your filters.</li>
        ) : (
          filteredItems.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong> ({item.type}) - {item.status}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MediaList;
