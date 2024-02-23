import React, { useState } from 'react';

const NewCourseworkForm = ({
  onAddCoursework,
  student,
  selectedClass,
  onClose,
}) => {
  const [newCoursework, setNewCoursework] = useState({
    type: '',
    topic: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCoursework((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Populate the rest of the coursework data with default values
    const completeCoursework = {
      ...newCoursework,
      result: 'NOT-GRADED',
      attendance: '0 of 0',
      status: 'N/A',
      notes: '',
    };

    onAddCoursework({
      classId: selectedClass,
      studentEmail: student.email,
      coursework: completeCoursework,
    });

    onClose();
  };

  return (
    <div className="w-1/3 rounded overflow-hidden shadow-lg bg-white m-4 p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={newCoursework.type}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="topic"
          placeholder="Topic"
          value={newCoursework.topic}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Coursework
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCourseworkForm;
