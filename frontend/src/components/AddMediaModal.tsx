import React, { useState } from "react";
import { createMediaItem } from "../api/mediaItemAPI"; 
import type { MediaType, ExperienceStatus, MediaItem } from "../types";

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMediaAdded?: () => void;
}

export default function AddMediaModal({ isOpen, onClose, onMediaAdded }: AddMediaModalProps) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(""); 
  const [type, setType] = useState<MediaType>("BOOK");
  const [genre, setGenre] = useState<string>("");
  const [releaseYear, setReleaseYear] = useState<number | undefined>(undefined);
  const [creator, setCreator] = useState("");
  const [status, setStatus] = useState<ExperienceStatus>("TO_EXPERIENCE");
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [review, setReview] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!type) {
      setError("Type is required.");
      return;
    }
    if (rating !== undefined && (rating < 1 || rating > 10)) {
      setError("Rating must be between 1 and 10.");
      return;
    }
    if (releaseYear !== undefined && releaseYear > currentYear) {
      setError(`Release year cannot exceed ${currentYear}.`);
      return;
    }

    setLoading(true);

    try {
      const newItem: Omit<MediaItem, "id"> = {
        title,
        type,
        genre,
        releaseYear,
        creator,
        status,
        rating,
        review,
      };
      await createMediaItem(newItem);
      if (onMediaAdded) onMediaAdded();
      onClose();
    } catch (error) {
      setError("Error creating media item.");
      console.error("Error creating media item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <h2>Add New Media</h2>
        <form onSubmit={handleSubmit}>
          {error && <div style={{ color: "red", marginBottom: "0.5rem" }}>{error}</div>}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select value={type} onChange={(e) => setType(e.target.value as MediaType)} required>
            <option value="BOOK">Book</option>
            <option value="MOVIE">Movie</option>
            <option value="SHOW">Show</option>
            <option value="GAME">Game</option>
          </select>
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Release Year"
            value={releaseYear ?? ""}
            min={1900}
            max={currentYear}
            onChange={(e) =>
              setReleaseYear(e.target.value ? Number(e.target.value) : undefined)
            }
          />
          <input
            type="text"
            placeholder="Creator"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value as ExperienceStatus)}>
            <option value="TO_EXPERIENCE">To Experience</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <input
            type="number"
            placeholder="Rating (1-10, optional)"
            value={rating ?? ""}
            min={1}
            max={10}
            onChange={(e) =>
              setRating(e.target.value ? Number(e.target.value) : undefined)
            }
          />
          <input
            type="text"
            placeholder="Review (optional)"
            value={review ?? ""}
            onChange={(e) => setReview(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Media"}
          </button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

const overlayStyles: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalStyles: React.CSSProperties = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  width: "300px",
};
