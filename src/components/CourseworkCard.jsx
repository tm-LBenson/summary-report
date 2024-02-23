import EditForm from '@/app/instructor-portal/components/EditForm';
import React, { useState } from 'react';

const CourseworkCard = ({
  course,
  student,
  allowEdit,
  selectedClass,
  onCourseUpdate,
  displayedData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState({
    classId: selectedClass,
    studentEmail: student.email,
    type: course.type,
    topic: course.topic,
    updates: {
      result: course.result,
      attendance: course.attendance,
      status: course.status,
      notes: course.notes,
    },
  });

  const resultTagColor = (result) => {
    switch (result) {
      case 'PASS':
        return 'bg-green-200 ml-4 rounded-xl text-green-800';
      case 'NOT-GRADED':
        return 'bg-yellow-200 ml-4 rounded-xl text-yellow-800';
      default:
        return 'bg-gray-200 ml-4 rounded-xl text-gray-800';
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (['result', 'attendance', 'status', 'notes'].includes(name)) {
      setEditedCourse((prev) => ({
        ...prev,
        updates: {
          ...prev.updates,
          [name]: value,
        },
      }));
    } else {
      setEditedCourse((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedCourse(course);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCourseUpdate(editedCourse);
    setIsEditing(false);
  };

  return (
    <div className="w-1/3 rounded overflow-hidden shadow-lg bg-white m-4 pb-8">
      <form onSubmit={handleSubmit} className="px-6 flex flex-col gap-4 py-4">
        {isEditing ? (
          <EditForm
            editedCourse={editedCourse}
            handleCancel={handleCancel}
            handleEditChange={handleEditChange}
          />
        ) : (
          <>
            <div className="font-bold flex justify-between items-center text-xl mb-2">
              {course.type} ({course.topic})
              {allowEdit && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 w-20 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-xl"
                >
                  Edit
                </button>
              )}
            </div>
            <p className="text-gray-700 text-base">
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold ${resultTagColor(
                  course.result
                )}`}
              >
                {course.result}
              </span>
            </p>
            <p className="text-gray-700 text-base">
              Attendance: {course.attendance}
            </p>
            <p className="text-gray-700 text-base">Notes: {course.notes}</p>
          </>
        )}
      </form>
    </div>
  );
};

export default CourseworkCard;
