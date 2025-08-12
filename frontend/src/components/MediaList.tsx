import React, { useEffect, useState } from "react";
import { filterMediaItems, updateMediaItem, deleteMediaItem } from "../api/mediaItemAPI";
import type { MediaItem, ExperienceStatus, MediaType } from "../types";

interface MediaListProps {
  status: ExperienceStatus;
  title: string;
  emptyMessage?: string;
  refreshKey?: number;
}

export default function MediaList({ status, title, emptyMessage, refreshKey }: MediaListProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFields, setEditFields] = useState<Partial<MediaItem>>({});
  const [filterFields, setFilterFields] = useState({
    title: "",
    type: "",
    genre: "",
    creator: "",
    rating: "",
    status: status,
  });

  const currentYear = new Date().getFullYear();

  const fetchFiltered = async (
    filters: { status?: ExperienceStatus } = { status }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const items = await filterMediaItems(filters);
      setMediaItems(items);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiltered();
  }, [status, refreshKey]);

  const handleEditClick = (item: MediaItem) => {
    setEditingId(item.id);
    setEditFields({
      title: item.title,
      type: item.type,
      genre: item.genre,
      releaseYear: item.releaseYear,
      creator: item.creator,
      status: item.status,
      rating: item.rating,
      review: item.review
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({
      ...prev,
      [name]:
        name === "rating"
          ? value === "" ? undefined : Number(value)
          : name === "releaseYear"
          ? value === "" ? undefined : Number(value)
          : value,
    }));
  };

  const handleEditSubmit = async (id: number) => {
    const item = mediaItems.find((m) => m.id === id);
    if (!item) return;
    try {
      const updated = await updateMediaItem(id, {
        ...item,
        ...editFields,
      });
      setMediaItems((prev) =>
        prev.map((m) => (m.id === id ? updated : m))
      );
      setEditingId(null);
      setEditFields({});
    } catch (err: any) {
      setError(err.message || "Failed to update item");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this media item?")) return;
    try {
      await deleteMediaItem(id);
      setMediaItems((prev) => prev.filter((m) => m.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setEditFields({});
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete item");
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const filters: any = {};
    if (filterFields.title.trim()) filters.title = filterFields.title.trim();
    if (filterFields.type) filters.type = filterFields.type;
    if (filterFields.genre.trim()) filters.genre = filterFields.genre.trim();
    if (filterFields.creator.trim()) filters.creator = filterFields.creator.trim();
    if (filterFields.rating) filters.rating = Number(filterFields.rating);
    filters.status = filterFields.status;
    fetchFiltered(filters);
  };

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={handleFilter} style={{ marginBottom: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={filterFields.title}
          onChange={handleFilterChange}
        />
        <select
          name="type"
          value={filterFields.type}
          onChange={handleFilterChange}
        >
          <option value="">All Types</option>
          <option value="BOOK">Book</option>
          <option value="MOVIE">Movie</option>
          <option value="SHOW">Show</option>
          <option value="GAME">Game</option>
        </select>
        <input
          name="genre"
          type="text"
          placeholder="Genre"
          value={filterFields.genre}
          onChange={handleFilterChange}
        />
        <input
          name="creator"
          type="text"
          placeholder="Creator"
          value={filterFields.creator}
          onChange={handleFilterChange}
        />
        <input
          name="rating"
          type="number"
          min={1}
          max={10}
          placeholder="Rating"
          value={filterFields.rating}
          onChange={handleFilterChange}
          style={{ width: "70px" }}
        />
        <button type="submit">Filter</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : mediaItems.length === 0 ? (
        <div>{emptyMessage || "No media to show."}</div>
      ) : (
        <ul>
          {mediaItems.map((item) => (
            <li key={item.id}>
              {editingId === item.id ? (
                <form
                  style={{ marginTop: "0.5rem" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditSubmit(item.id);
                  }}
                >
                  <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={editFields.title ?? ""}
                    onChange={handleEditChange}
                    required
                    style={{ marginRight: "0.5rem" }}
                  />
                  <select
                    name="type"
                    value={editFields.type as MediaType}
                    onChange={handleEditChange}
                    required
                    style={{ marginRight: "0.5rem" }}
                  >
                    <option value="BOOK">Book</option>
                    <option value="MOVIE">Movie</option>
                    <option value="SHOW">Show</option>
                    <option value="GAME">Game</option>
                  </select>
                  <input
                    name="genre"
                    type="text"
                    placeholder="Genre"
                    value={editFields.genre ?? ""}
                    onChange={handleEditChange}
                    required
                    style={{ marginRight: "0.5rem" }}
                  />
                  <input
                    name="releaseYear"
                    type="number"
                    min={1900}
                    max={currentYear}
                    placeholder="Release Year"
                    value={editFields.releaseYear ?? ""}
                    onChange={handleEditChange}
                    style={{ width: "110px", marginRight: "0.5rem" }}
                  />
                  <input
                    name="creator"
                    type="text"
                    placeholder="Creator"
                    value={editFields.creator ?? ""}
                    onChange={handleEditChange}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <select
                    name="status"
                    value={editFields.status as ExperienceStatus}
                    onChange={handleEditChange}
                    style={{ marginRight: "0.5rem" }}
                  >
                    <option value="TO_EXPERIENCE">To Experience</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                  <input
                    name="rating"
                    type="number"
                    min={1}
                    max={10}
                    placeholder="Rating"
                    value={editFields.rating ?? ""}
                    onChange={handleEditChange}
                    style={{ width: "60px", marginRight: "0.5rem" }}
                  />
                  <input
                    name="review"
                    type="text"
                    placeholder="Review"
                    value={editFields.review ?? ""}
                    onChange={handleEditChange}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <button type="submit" style={{ marginRight: "0.5rem" }}>Save</button>
                  <button type="button" onClick={() => setEditingId(null)} style={{ marginRight: "0.5rem" }}>Cancel</button>
                  <button type="button" onClick={() => handleDelete(item.id)} style={{ color: "red" }}>Delete</button>
                </form>
              ) : (
                <>
                  <strong>{item.title}</strong> ({item.type}) - {item.genre} {item.releaseYear && `- ${item.releaseYear}`}
                  <div>
                    Creator: {item.creator ?? "-"}, Status: {item.status}, Rating: {item.rating ?? "-"}, Review: {item.review ?? "-"}
                    <button style={{ marginLeft: "1rem" }} onClick={() => handleEditClick(item)}>
                      Edit
                    </button>
                    <button style={{ marginLeft: "0.5rem", color: "red" }} onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}