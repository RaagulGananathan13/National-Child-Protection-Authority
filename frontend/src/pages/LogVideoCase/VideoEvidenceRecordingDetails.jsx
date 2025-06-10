import React, { useState } from 'react';

const VideoEvidenceRecordingDetails = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') setDate(value);
    if (name === 'startTime') setStartTime(value);
    if (name === 'endTime') setEndTime(value);
    if (name === 'duration') setDuration(value);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Video Evidence Recording Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {/* Date */}
        <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-semibold text-gray-700 mb-2">Date (*)</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />
        </div>

        {/* Start Time */}
        <div className="flex flex-col">
          <label htmlFor="startTime" className="text-sm font-semibold text-gray-700 mb-2">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={startTime}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />
        </div>

        {/* End Time */}
        <div className="flex flex-col">
          <label htmlFor="endTime" className="text-sm font-semibold text-gray-700 mb-2">End Time</label>
          <input
            type="time"
            name="endTime"
            value={endTime}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Duration */}
      <div className="flex flex-col mb-4">
        <label htmlFor="duration" className="text-sm font-semibold text-gray-700 mb-2">Duration</label>
        <input
          type="text"
          name="duration"
          value={duration}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md"
          placeholder="Duration"
        />
      </div>
    </div>
  );
};

export default VideoEvidenceRecordingDetails;
