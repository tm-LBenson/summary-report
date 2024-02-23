export default function Sidebar({
  classData,
  displayedData,
  handleStudentClick,
  setSelectedClass,
}) {
  return (
    <>
    
      <aside className="w-64 h-screen fixed top-0 overflow-y-auto bg-gray-100 p-5">
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
