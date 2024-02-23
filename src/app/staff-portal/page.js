'use client';
import Header from '@/components/Header';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function page() {
  const [classData, setClassData] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [displayedData, setDisplayedData] = useState();
  function updateSelectedClassHandler(event) {
    setSelectedClass(event.target.value);
  }
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        'https://astro-server-z1u9.onrender.com/summary-sheets'
      );
      setClassData(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(classData);
    setDisplayedData(
      classData?.filter((element) => {
        return element.classId === selectedClass;
      })[0]
    );
  }, [selectedClass]);

  useEffect(() => {
    console.log(displayedData);
  }, [displayedData]);

  return (
    <>
      <Header
        welcomeMessage="Staff Portal"
        description="Welcome to the Staff Portal. To view the progress of students, please select a class from the dropdown menu below. You can then click on a student's name to see their detailed progress summary."
      />
      <main className="flex items-center flex-col justify-center gap-20">
        <select
          onChange={updateSelectedClassHandler}
          className="border w-44 border-slate-700 rounded mb-3"
        >
          <option value="">Select Class</option>
          {classData &&
            classData.map((element) => (
              <option key={element._id} value={element.classId}>
                {element.classId}
              </option>
            ))}
        </select>
        <section>
          <ul className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-6">
            {displayedData?.students.map((student) => (
              <li
                className={[
                  'p-5',
                  'cursor-pointer',
                  'bg-slate-400',
                  'hover:bg-slate-700',
                  'focus:bg-slate-700',
                ].join(' ')}
                key={student._id}
              >
                {student.name}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
