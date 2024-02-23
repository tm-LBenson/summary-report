import React from 'react';
import StudentSummary from './StudentSummary';

export default function MainContent({
  selectedStudent,
  displayedData,
  allowEdit,
}) {
  return (
    <main className="ml-28 p-8 w-full">
      {selectedStudent && displayedData ? (
        <>
          <h2 className="text-xl text-center font-bold mb-4">
            Student: {selectedStudent.name} - Coursework Details
          </h2>
          <StudentSummary allowEdit={allowEdit} student={selectedStudent} />
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
