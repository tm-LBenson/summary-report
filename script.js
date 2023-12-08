'use strict';
import {parse} from "https://www.unpkg.com/csv-parse@5.5.3/dist/esm/sync.js";
import { parseSheet } from "./parse-sheet.js";


function processData() {
  const rawData = document.getElementById('courseData').value;
  const input = rawData;
  const options = {delimiter: "\t"};
  const data = parse(input, options);
  console.log(data);
  const weekAndPreworkHeadings = data[0];
  const topicHeadings = data[1];
  //const rows = rawData.split('\n').map((row) => row.split('\t'));
  // const weekAndPreworkHeadings = rows[3].slice(2); // Starting from C4
  // const topicHeadings = rows[4].slice(2); // Starting from C5
  const students = parseSheet(data)
  console.log(students);


  displayStudentList(students);
}

function displayStudentList(students) {
  const studentListDiv = document.getElementById('studentList');
  studentListDiv.innerHTML = '';

  students.forEach((student) => {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-secondary', 'm-2');
    button.innerText = student.studentName;

    button.onclick = () => {
      toggleStudentList();
      return displayStudentSummary(student);
    };
    studentListDiv.appendChild(button);
  });
}

function displayStudentSummary(student) {
  const summaryDiv = document.getElementById('studentSummary');
  let totalCatchUpTime = 0;
  let totalAttendance = 0;

  summaryDiv.innerHTML = `
        <div class="container">
            <h2 class="mt-4">${student.studentName}</h2>
            <p>Email: ${student.studentEmail}</p>
            <div class="row">`;

  student.weeklyReports.forEach((report) => {
    // If no result, skip rendering this course
    if (
      !report.topic
    )
      return;

    // Calculate attendance for courses other than pre-work
    let attendance = course.attendance;
    let attendanceText = 'N/A'; 
    if(attendance) {
      attendanceText = attendance.grade;
    }
    let catchUpTime;
    if (attendance !== 'N/A') {
      let [attended, outOf] = attendance.split(' of ').map(Number);
      totalAttendance += attended;
      // Calculate catch-up time
      catchUpTime = course.result.includes(' out of ')
        ? estimateCatchUpTime(...course.result.split(' out of ').map(Number))
        : course.result === '0'
        ? 60
        : 0; // If '0', assume 60 minutes for catch-up time
      totalCatchUpTime += catchUpTime;
      attendance = `${attended} of ${outOf}`;
    }

    // Render the course card
    summaryDiv.innerHTML += `
      <div class="col-md-6 mb-3">
        <div class="card">
          <div class="card-header">${course.type} (${course.topic})</div>
          <div class="card-body">
            <p class="card-text">Result: ${course.result}</p>
            <p class="card-text">Attendance: ${attendance}</p>
            ${
              attendance !== 'N/A'
                ? `<p class="card-text">Estimated catch-up time: ${catchUpTime} minutes</p>`
                : ''
            }
          </div>
        </div>
      </div>`;
  });

  // Add notes and summary
  summaryDiv.innerHTML += `
    <div class="col-md-12 mb-3">
      <div class="card">
        <div class="card-header">Notes and Summary</div>
        <div class="card-body">
          <p class="card-text">${student.notes}</p>
          <p class="card-text">Total Estimated Catch-Up Time: ${totalCatchUpTime} minutes</p>
          <p class="card-text">Total Attendance: ${totalAttendance} days</p>
        </div>
      </div>
    </div>
  </div>`;

  summaryDiv.style.display = 'block';
}

function estimateCatchUpTime(completed, total) {
  const assignmentsLeft = total - completed;
  if (assignmentsLeft === 0) return 0; // No catch-up time needed if there are no assignments left
  const timePerAssignment = 45; // Average time per assignment
  return assignmentsLeft * timePerAssignment; // Total catch up time
}

function toggleStudentList() {
  const studentListDiv = document.getElementById('studentList');
  const toggleButton = document.getElementById('toggleStudentsButton');
  if (studentListDiv.style.display === 'none') {
    studentListDiv.style.display = 'flex';
    toggleButton.textContent = 'Hide Students';
  } else {
    studentListDiv.style.display = 'none';
    toggleButton.textContent = 'Show Students';
  }
}

// Add the event listener to the toggle button
document
  .getElementById('toggleStudentsButton')
  .addEventListener('click', toggleStudentList);

// Add the event listener to the process button
document
  .getElementById('processDataButton')
  .addEventListener('click', processData);
