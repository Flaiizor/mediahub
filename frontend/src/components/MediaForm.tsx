import React, { useState } from "react";
import type { MediaItem } from "../types";

interface MediaFormProps {
  onAdd: (item: Omit<MediaItem, "id">) => void;
}

export default function MediaForm({ onAdd }: MediaFormProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState<number | "">("");
  const [creator, setCreator] = useState("");
  const [status, setStatus] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && type && genre && releaseYear && creator && status) {
      onAdd({
        title,
        type,
        genre,
        releaseYear: Number(releaseYear),
        creator,
        status,
        review,
      });
      setTitle("");
      setType("");
      setGenre("");
      setReleaseYear("");
      setCreator("");
      setStatus("");
      setReview("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" />
      <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" />
      <input
        type="number"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value ? Number(e.target.value) : "")}
        placeholder="Release Year"
      />
      <input value={creator} onChange={(e) => setCreator(e.target.value)} placeholder="Creator" />
      <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" />
      <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Review" />
      <button type="submit">Add</button>
    </form>
  );
}
