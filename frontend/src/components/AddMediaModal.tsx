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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xs p-6">
        <h2 className="text-xl font-bold mb-4 text-fuchsia-800">Add New Media</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {error && (
            <div className="text-red-600 text-sm mb-2">{error}</div>
          )}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as MediaType)}
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          >
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
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
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
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          />
          <input
            type="text"
            placeholder="Creator"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ExperienceStatus)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          >
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
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          />
          <input
            type="text"
            placeholder="Review (optional)"
            value={review ?? ""}
            onChange={(e) => setReview(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          />
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-fuchsia-800 hover:bg-fuchsia-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Media"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
