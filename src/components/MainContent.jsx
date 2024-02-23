import React from 'react';
import StudentSummary from './StudentSummary';

export default function MainContent({ selectedStudent, displayedData }) {
  return (
    <main className="ml-64 p-8 w-full">
      {selectedStudent && displayedData ? (
        <>
          <h2 className="text-xl text-center font-bold mb-4">
            Student: {selectedStudent.name} - Coursework Details
          </h2>
          <StudentSummary student={selectedStudent} />
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
