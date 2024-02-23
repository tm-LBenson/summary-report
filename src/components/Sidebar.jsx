import React, { useState } from 'react';

export default function Sidebar({
  classData,
  displayedData,
  handleStudentClick,
  setSelectedClass,
}) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Position the toggle button independently outside the sidebar */}
      <div
        className={`fixed top-5 z-30 ${
          isOpen ? 'left-[256px]' : 'left-0'
        } transition-all duration-300 ease-in-out`}
      >
        <button
          onClick={toggleDrawer}
          className={`bg-blue-500 relative ${
            isOpen ? 'right-2 ' : 'left-1'
          } text-white p-2 rounded-full focus:outline-none`}
        >
          {isOpen ? '>' : '<'}
        </button>
      </div>

      <aside
        className={`w-64 h-screen fixed top-0 ${
          isOpen ? 'left-0' : '-left-64'
        } overflow-y-auto bg-gray-100 p-5 transition-all duration-300 ease-in-out`}
      >
        <div>
          <select
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-slate-700 rounded mb-3 w-full"
          >
            <option value="">Select Class</option>
            {classData.map((element) => (
              <option key={element._id} value={element.classId}>
                {element.classId}
              </option>
            ))}
          </select>
        </div>
        <ul className="py-6 mb-20">
          {displayedData?.students.map((student) => (
            <li
              key={student._id}
              className="cursor-pointer hover:bg-gray-200 p-2"
              onClick={() => handleStudentClick(student)}
            >
              {student.name}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
