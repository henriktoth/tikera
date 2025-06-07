import React, { useState } from 'react';

function AddMovieModal({ onClose, onMovieAdded }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    imagePath: '',
    duration: '',
    genre: '',
    releaseYear: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (onMovieAdded) onMovieAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-neutral-900 text-white rounded-xl p-8 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Add Movie</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2"
          />
          <input
            name="imagePath"
            placeholder="Image Path"
            value={form.imagePath}
            onChange={handleChange}
            required
            className="border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2"
          />
          <input
            name="duration"
            placeholder="Duration (minutes)"
            type="number"
            value={form.duration}
            onChange={handleChange}
            required
            className="border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2"
          />
          <input
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
            required
            className="border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2"
          />
          <input
            name="releaseYear"
            placeholder="Release Year"
            type="number"
            value={form.releaseYear}
            onChange={handleChange}
            required
            className="border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-purple-700 text-white rounded px-4 py-2 hover:bg-purple-800"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMovieModal;