import React, { useState, useEffect } from 'react';
import CourseworkCard from './CourseworkCard';
import NewCourseworkForm from '@/app/instructor-portal/components/NewCourseworkForm';
import AddNewCourseworkButton from '@/app/instructor-portal/components/AddNewCourseworkButton';

const StudentSummary = ({
  student,
  allowEdit,
  onCourseUpdate,
  onAddCoursework,
  selectedClass,
  displayedData,
}) => {
  const [showAddNewForm, setShowAddNewForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filtered, setFiltered] = useState(student);
  const data = displayedData.students.find(
    (element) => element.name === student.name
  );
  useEffect(() => setFiltered(data), [data]);
  return (
    <div className="flex flex-wrap justify-center">
      {filtered?.coursework?.map((course, index) => (
        <CourseworkCard
          key={index}
          course={course}
          student={student}
          allowEdit={allowEdit}
          onCourseUpdate={onCourseUpdate}
          selectedClass={selectedClass}
          displayedData={displayedData}
        />
      ))}
      {allowEdit && !isEditing && (
        <AddNewCourseworkButton
          onClick={() => {
            setIsEditing(true);
            setShowAddNewForm(true);
          }}
        />
      )}
      {showAddNewForm && isEditing && (
        <NewCourseworkForm
          student={student}
          selectedClass={selectedClass}
          onAddCoursework={onAddCoursework}
          onClose={() => {
            setIsEditing(false);
            setShowAddNewForm(false);
          }}
        />
      )}
    </div>
  );
};

export default StudentSummary;
