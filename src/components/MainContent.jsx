import React from 'react';
import StudentSummary from './StudentSummary';

export default function MainContent({
  selectedStudent,
  displayedData,
  allowEdit,
  selectedClass,
  onCourseUpdate,
}) {
  return (
    <main className="ml-28 p-8 w-full">
      {selectedStudent && displayedData ? (
        <>
          <h2 className="text-xl text-center font-bold mb-4">
            Student: {selectedStudent.name} - Coursework Details
          </h2>
          <StudentSummary
            onCourseUpdate={onCourseUpdate}
            allowEdit={allowEdit}
            student={selectedStudent}
            selectedClass={selectedClass}
            displayedData={displayedData}
          />
        </>
      ) : (
        <p className="text-center">
          Select a student from the sidebar to view their coursework details
          here.
        </p>
      )}
    </main>
  );
}
