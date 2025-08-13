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
      <h2 className="text-2xl font-bold text-fuchsia-800 mb-4">{title}</h2>
      <form
        onSubmit={handleFilter}
        className="flex flex-wrap gap-2 mb-6 bg-fuchsia-50 p-4 rounded-lg shadow"
      >
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={filterFields.title}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
        />
        <select
          name="type"
          value={filterFields.type}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
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
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
        />
        <input
          name="creator"
          type="text"
          placeholder="Creator"
          value={filterFields.creator}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
        />
        <input
          name="rating"
          type="number"
          min={1}
          max={10}
          placeholder="Rating"
          value={filterFields.rating}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 w-20"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-fuchsia-800 text-white hover:bg-fuchsia-600 rounded-lg transition-colors font-medium"
        >
          Filter
        </button>
      </form>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <>
          {mediaItems.length === 0 ? (
            <div className="text-gray-500">{emptyMessage || "No media to show."}</div>
          ) : (
            <ul className="space-y-4">
              {mediaItems.map((item) => (
                <li
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
                >
                  {editingId === item.id ? (
                    <form
                      className="flex flex-wrap gap-2 items-center"
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
                        className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                      />
                      <select
                        name="type"
                        value={editFields.type as MediaType}
                        onChange={handleEditChange}
                        required
                        className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
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
                        className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                      />
                      <input
                        name="releaseYear"
                        type="number"
                        min={1900}
                        max={currentYear}
                        placeholder="Release Year"
                        value={editFields.releaseYear ?? ""}
                        onChange={handleEditChange}
                        className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 w-24"
                      />
                      <input
                        name="creator"
                        type="text"
                        placeholder="Creator"
                        value={editFields.creator ?? ""}
                        onChange={handleEditChange}
                        className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                      />
                      <select
                        name="status"
                        value={editFields.status as ExperienceStatus}
                        onChange={handleEditChange}
                        className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
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
                        className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 w-16"
                      />
                      <input
                        name="review"
                        type="text"
                        placeholder="Review"
                        value={editFields.review ?? ""}
                        onChange={handleEditChange}
                        className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-fuchsia-800 text-white hover:bg-fuchsia-600 rounded-lg transition-colors font-medium"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                      >
                        Delete
                      </button>
                    </form>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-fuchsia-900">{item.title}</span>
                        <span className="text-xs bg-fuchsia-100 text-fuchsia-800 px-2 py-1 rounded">{item.type}</span>
                        <span className="text-gray-500">{item.genre}</span>
                        {item.releaseYear && (
                          <span className="text-gray-400">- {item.releaseYear}</span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span>Creator: <span className="font-medium">{item.creator ?? "-"}</span></span>
                        <span>Status: <span className="font-medium">{item.status}</span></span>
                        <span>Rating: <span className="font-medium">{item.rating ?? "-"}</span></span>
                        <span>Review: <span className="font-medium">{item.review ?? "-"}</span></span>
                        <button
                          className="ml-auto px-3 py-1 bg-fuchsia-800 text-white hover:bg-fuchsia-600 rounded-lg transition-colors font-medium"
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}