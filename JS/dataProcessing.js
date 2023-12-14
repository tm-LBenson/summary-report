'use strict';
/** dataProcessing.js The purpose of this file is to contain all the dataProcessing functions 
 the spreadsheet inserted will be split apart, the data extracted, everything is placed in datastructures that allow the backend to handle it data easily for the DB
*/

import { postData } from './postData.js';
import { createAlert } from './uiManagement.js';
export async function processData() {
  const selectedClass = document.getElementById('classSelection').value;
  if (!selectedClass) {
    alert('Please select a class.');
    return;
  }
  try {
    const rawData = document.getElementById('courseData').value;
    const rows = rawData.split('\n').map((row) => row.split('\t'));

    const weekAndPreworkHeadings = rows[3].slice(2); // Starting from C4
    const topicHeadings = rows[4].slice(2); // Starting from C5
    const students = extractStudentData(
      rows.slice(5),
      weekAndPreworkHeadings,
      topicHeadings
    ); // Student data starts from row 6

    // displayStudentList(students);
    const dataForApi = {
      classId: selectedClass,
      students: students,
    };

    console.log('sending data');
    await postData('summary-sheets', dataForApi);

    document.querySelector('#alert-area').appendChild(createAlert());
    setTimeout(() => {
      console.log('redirecting');
      window.location.href = '../staff-portal/';
    }, 2600);
  } catch (error) {
    console.error(error);
    alert('Invalid data');
  }
}

export function extractStudentData(
  dataRows,
  weekAndPreworkHeadings,
  topicHeadings
) {
  let students = [];

  // Find where the actual weeks start (excluding pre-work).
  let actualWeekStartIndex = weekAndPreworkHeadings.findIndex((heading) =>
    heading.toLowerCase().includes('week 1')
  );

  // Find where the attendance data starts.
  let attendanceStartIndex = topicHeadings.findIndex((heading) =>
    heading.toLowerCase().includes('attendance')
  );

  dataRows.forEach((row) => {
    // Remove empty cells from the end of the row
    while (row.length > 0 && row[row.length - 1].trim() === '') {
      row.pop();
    }
    if (row.length > 2 && row[0] !== '') {
      let coursework = [];
      let attendanceData = row.slice(attendanceStartIndex + 2); // +2 to adjust for student name and email

      // Process coursework and pre-work data
      for (let i = 0; i < actualWeekStartIndex; i++) {
        coursework.push({
          type: weekAndPreworkHeadings[i],
          topic: topicHeadings[i],
          result: row[i + 2], // +2 to skip the name and email columns
          attendance: 'N/A', // Pre-work doesn't have attendance
        });
      }

      // Process weekly coursework data
      for (
        let i = actualWeekStartIndex, j = 0;
        i < attendanceStartIndex;
        i++, j++
      ) {
        coursework.push({
          type: weekAndPreworkHeadings[i],
          topic: topicHeadings[i],
          result: row[i + 2], // +2 to skip the name and email columns
          attendance: row[attendanceStartIndex + 2 + j] || '0 of 0', // Align attendance with coursework
        });
      }

      // Assuming notes are in the last column
      let notes = row[row.length - 1] || '';

      students.push({
        name: row[0],
        email: row[1],
        coursework: coursework,
        notes: notes,
      });
    }
  });

  return students;
}
