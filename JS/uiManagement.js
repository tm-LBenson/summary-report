'use strict';
/** uiManagement.js The purpose of this file is to handle all the user interface and items displayed within the browser */

export function displayStudentList(students) {
  const studentListDiv = document.getElementById('studentList');
  studentListDiv.innerHTML = '';

  students.forEach((student) => {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-secondary', 'm-2');
    button.innerText = student.name;

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
            <h2 class="mt-4">${student.name}</h2>
            <p>Email: ${student.email}</p>
            <div class="row">`;

  student.coursework.forEach((course) => {
    // If no result, skip rendering this course
    if (
      course.result.trim() === '' &&
      course.type.toLowerCase().indexOf('week') !== -1
    )
      return;

    // Calculate attendance for courses other than pre-work
    let attendance = course.attendance;
    let catchUpTime;
    if (attendance !== 'N/A') {
      let attendanceParts = attendance.split(' ');
      let attended = Number(attendanceParts[0]);
      let outOf = Number(attendanceParts[attendanceParts.length - 1]);
      totalAttendance += attended;

      // Calculate catch-up time
      let resultParts = course.result.split(' ');
      catchUpTime =
        resultParts.length > 1
          ? estimateCatchUpTime(
              Number(resultParts[0]),
              Number(resultParts[resultParts.length - 1])
            )
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

export function toggleStudentList() {
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

export function createAlert() {
  const div = document.createElement('div');
  div.innerHTML = `<div class="alert alert-success" role="alert">
  Class data successfully updated!
</div>`;
  return div;
}
