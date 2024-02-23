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
        welcomeMessage="Staff Portal"
        description="Welcome to the Staff Portal. Select a class and then a student to view details."
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
          selectedStudent={selectedStudent}
          displayedData={displayedData}
        />
      </div>
    </>
  );
}
