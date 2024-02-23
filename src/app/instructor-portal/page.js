'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MainContent from '../../components/MainContent';
import SpreadsheetInputForm from './components/SpreadsheetInputForm';

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

  useEffect(() => {
    const selectedData = classData.find(
      (element) => element.classId === selectedClass
    );
    setDisplayedData(selectedData);
  }, [classData]);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  async function submitSpreadsheet(parsedSpreadsheetData) {
    await axios.post(
      'https://astro-server-z1u9.onrender.com/summary-sheets',
      parsedSpreadsheetData
    );
    const response = await axios.get(
      'https://astro-server-z1u9.onrender.com/summary-sheets'
    );
    setClassData(response.data);
    console.log('Updated Backend');
  }

  return (
    <div className="flex">
      <div
        className=" mr-1 flex-shrink-0 w-64 reletive top-0"
        aria-hidden="true"
      ></div>
      <div>
        <Header
          welcomeMessage="Instructor Portal"
          description="The intended use of the Instructor Portal is for instructors to manage their classes and update the notes for the summary."
        />
        {selectedClass && (
          <SpreadsheetInputForm
            submitSpreadsheet={submitSpreadsheet}
            classId={selectedClass}
          />
        )}
        <div className="flex">
          <Sidebar
            classData={classData}
            displayedData={displayedData}
            handleStudentClick={handleStudentClick}
            setSelectedClass={setSelectedClass}
          />
          <div className="flex flex-col align-center">
            <MainContent
              allowEdit={true}
              selectedStudent={selectedStudent}
              displayedData={displayedData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
