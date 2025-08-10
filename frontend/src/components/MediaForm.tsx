import React, { useState } from "react";
import type { MediaType, ExperienceStatus, MediaItem } from "../types";
import { mediaTypes, experienceStatuses } from "../types";
import { createMediaItem } from "../api/mediaItemAPI";

interface MediaFormProps {
  onAdd: (newItem: MediaItem) => void;
}

const MediaForm: React.FC<MediaFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<MediaType>("MOVIE");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState<number | "">("");
  const [creator, setCreator] = useState("");
  const [status, setStatus] = useState<ExperienceStatus>("TO_EXPERIENCE");
  const [review, setReview] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!genre.trim()) {
      setError("Genre is required");
      return;
    }
    if (!creator.trim()) {
      setError("Creator is required");
      return;
    }
    if (!releaseYear || releaseYear <= 0) {
      setError("Release year must be a positive number");
      return;
    }

    try {
      const newItem = await createMediaItem({
        title,
        type,
        genre,
        releaseYear,
        creator,
        status,
        review,
      });
      onAdd(newItem);
      setTitle("");
      setType("MOVIE");
      setGenre("");
      setReleaseYear("");
      setCreator("");
      setStatus("TO_EXPERIENCE");
      setReview("");
    } catch {
      setError("Failed to create media item");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h3>Add New Media Item</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>
          Title:<br />
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
      </div>

      <div>
        <label>
          Type:<br />
          <select value={type} onChange={e => setType(e.target.value as MediaType)}>
            {mediaTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Genre:<br />
          <input value={genre} onChange={e => setGenre(e.target.value)} required />
        </label>
      </div>

      <div>
        <label>
          Release Year:<br />
          <input
            type="number"
            value={releaseYear}
            onChange={e => setReleaseYear(Number(e.target.value) || "")}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Creator:<br />
          <input value={creator} onChange={e => setCreator(e.target.value)} required />
        </label>
      </div>

      <div>
        <label>
          Status:<br />
          <select value={status} onChange={e => setStatus(e.target.value as ExperienceStatus)}>
            {experienceStatuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Review:<br />
          <textarea value={review} onChange={e => setReview(e.target.value)} />
        </label>
      </div>

      <button type="submit" style={{ marginTop: "1rem" }}>Add Media</button>
    </form>
  );
};

export default MediaForm;
