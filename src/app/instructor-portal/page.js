'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MainContent from '../../components/MainContent';

export default function Page() {
  const [classData, setClassData] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [displayedData, setDisplayedData] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
    const selectedData = classData.find(
      (element) => element.classId === selectedClass
    );
    setDisplayedData(selectedData);
  }, [selectedClass, classData]);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <>
      <Header
        welcomeMessage="Instructor Portal"
        description="The intended use of the Instructor Portal is for instructors to manage their classes and update the notes for the summary."
        sidebar={true}
      />
      <div className="flex">
        <Sidebar
          classData={classData}
          displayedData={displayedData}
          handleStudentClick={handleStudentClick}
          setSelectedClass={setSelectedClass}
        />
        <MainContent
          allowEdit={true}
          selectedStudent={selectedStudent}
          displayedData={displayedData}
        />
      </div>
    </>
  );
}
