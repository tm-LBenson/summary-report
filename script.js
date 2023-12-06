'use strict';

function processData() {
  const rawData = document.getElementById('courseData').value;
  const rows = rawData.split('\n').map((row) => row.split('\t'));

  const weekAndPreworkHeadings = rows[3].slice(2); // Starting from C4
  const topicHeadings = rows[4].slice(2); // Starting from C5
  const students = extractStudentData(
    rows.slice(5),
    weekAndPreworkHeadings,
    topicHeadings
  ); // Student data starts from row 6

  displayStudentList(students);
}

function extractStudentData(dataRows, weekAndPreworkHeadings, topicHeadings) {
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

function displayStudentList(students) {
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
