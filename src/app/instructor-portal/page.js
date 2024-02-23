'use client';
import Header from '@/components/Header';
import React from 'react';

export default function page() {
  return (
    <>
      <Header
        welcomeMessage="Instructor Portal"
        description="Please use the specific spreadsheet template provided for course data. Ensure no stray characters or notes are included outside of the standard data cells. Any deviations from the template format may result in errors during data processing."
      />
      <main className="flex justify-center gap-20"></main>
    </>
  );
}
