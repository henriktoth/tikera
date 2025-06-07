import React, { useState } from 'react';

function AddScreeningModal({ onClose, onScreeningAdded }) {
  const [form, setForm] = useState({
    movieId: '',
    roomSize: '7x8',
    date: '',
    startTime: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (onScreeningAdded) onScreeningAdded();
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
        <h2 className="text-xl font-bold mb-4">Add Screening</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Movie ID</label>
            <input
              name="movieId"
              placeholder="Movie ID"
              value={form.movieId}
              onChange={handleChange}
              required
              className="border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Room Size</label>
            <select
              name="roomSize"
              value={form.roomSize}
              onChange={handleChange}
              className="border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2 w-full"
            >
              <option value="7x8">7x8</option>
              <option value="10x10">10x10</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Start Time</label>
            <input
              name="startTime"
              type="time"
              value={form.startTime}
              onChange={handleChange}
              required
              className="border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-700 text-white rounded px-4 py-2 hover:bg-purple-800"
          >
            Add Screening
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddScreeningModal;