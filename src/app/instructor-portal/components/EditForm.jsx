import React from 'react';

export default function EditForm({
  editedCourse,
  handleEditChange,
  handleCancel,
}) {
  return (
    <>
      <input
        type="text"
        name="type"
        value={editedCourse.type}
        onChange={handleEditChange}
        className="mb-2 p-2 border rounded"
      />
      <input
        type="text"
        name="topic"
        value={editedCourse.topic}
        onChange={handleEditChange}
        className="mb-2 p-2 border rounded"
      />
      <input
        type="text"
        name="result"
        value={editedCourse.updates?.result}
        onChange={handleEditChange}
        className={`mb-2 p-2 border rounded`}
      />
      <input
        type="text"
        name="attendance"
        value={editedCourse.updates?.attendance}
        onChange={handleEditChange}
        className="mb-2 p-2 border rounded"
      />
      <textarea
        name="notes"
        value={editedCourse.updates?.notes}
        onChange={handleEditChange}
        className="mb-2 p-2 border rounded"
        rows="3"
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </>
  );
}
