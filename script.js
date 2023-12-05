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

  // Find the starting index for attendance which comes after all coursework, including pre-work.
  let attendanceStartIndex = topicHeadings.findIndex((heading) =>
    heading.toLowerCase().includes('attendance')
  );
  let totalCourseworkCount = weekAndPreworkHeadings.length; // Total number of coursework items including pre-work

  dataRows.forEach((row) => {
    if (row.length > 2 && row[0] !== '') {
      let coursework = [];
      let attendance = [];

      // Process coursework and pre-work data
      for (let i = 0; i < totalCourseworkCount; i++) {
        if (weekAndPreworkHeadings[i].trim() !== '') {
          coursework.push({
            type: weekAndPreworkHeadings[i],
            topic: topicHeadings[i],
            result: row[i + 2], // +2 to skip the name and email columns
          });
        }
      }

      // Process attendance data
      for (let i = 0; i < topicHeadings.length; i++) {
        if (topicHeadings[i].toLowerCase().includes('attendance')) {
          // +2 to skip the name and email columns, and adjust index by subtracting pre-work count
          attendance.push(row[i + 2] || '0 of 0');
        }
      }

      // Slice the attendance array to remove the pre-work attendance placeholders
      attendance = attendance.slice(
        coursework.filter((cw) => !cw.type.toLowerCase().includes('pre-work'))
          .length
      );

      // Assuming notes are in the last column, following attendance
      let notes = row[row.length - 1] || '';

      let student = {
        name: row[0],
        email: row[1],
        coursework: coursework,
        attendance: attendance,
        notes: notes,
      };
      students.push(student);
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
  let notesContent = ''; // Variable to hold notes content

  summaryDiv.innerHTML = `
        <div class="container">
            <h2 class="mt-4">${student.name}</h2>
            <p>Email: ${student.email}</p>
            <div class="row">`;

  student.coursework.forEach((course, index) => {
    if (course.type.toLowerCase() === 'notes:') {
      // Save the notes content and do not create a card for it
      notesContent = course.result;
      return; // Skip the iteration for notes
    }

    if (course.result.trim() === '') {
      // If there's no result, don't display this course
      return;
    }

    const attendanceData = student.attendance[index] || '0 of 0';
    const [attended, totalDays] = attendanceData.split(' of ').map(Number);
    totalAttendance += attended; // Add attended days to total

    let catchUpTime = 0;
    if (
      course.result !== 'PASS' &&
      course.result !== 'NOT GRADED' &&
      course.result.trim() !== ''
    ) {
      let [completed, total] =
        course.result === '0'
          ? [0, course.type.toLowerCase().includes('pre-work') ? 1 : 6]
          : course.result.split(' out of ').map(Number);
      catchUpTime = estimateCatchUpTime(completed, total, course.type);
      totalCatchUpTime += isNaN(catchUpTime) ? 0 : catchUpTime; // Add catch-up time to total
    }

    // Create cards for each week's coursework and attendance

    summaryDiv.innerHTML += `
                <div class="col-md-6 mb-3">
                    <div class="card">
                        <div class="card-header">${course.type} (${
      course.topic
    })</div>
                        <div class="card-body">
                            <p class="card-text">Result: ${course.result}</p>
                            <p class="card-text">Attendance: ${attendanceData}</p>
                            ${
                              catchUpTime
                                ? `<p class="card-text">Estimated catch-up time: ${catchUpTime} minutes</p>`
                                : ''
                            }
                        </div>
                    </div>
                </div>`;
  });

  // After processing coursework, create one card for Notes and Summary
  const catchUpTimeString = totalCatchUpTime
    ? `${totalCatchUpTime} minutes`
    : 'N/A';
  const attendanceString = `${totalAttendance} days`;

  summaryDiv.innerHTML += `
    <div class="col-md-12 mb-3">
      <div class="card">
        <div class="card-header">Notes and Summary</div>
        <div class="card-body">
          <p class="card-text">${notesContent}</p>
          <p class="card-text">Total Estimated Catch-Up Time: ${catchUpTimeString}</p>
          <p class="card-text">Total Attendance: ${attendanceString}</p>
        </div>
      </div>
    </div>
  </div>`;

  summaryDiv.style.display = 'block';
}

function estimateCatchUpTime(completed, total, type) {
  const assignmentsLeft = total - completed;
  if (assignmentsLeft === 0) return 'N/A'; // No catch-up time needed if there are no assignments left

  // For pre-work, if no assignments are completed, assume 1 assignment with 60 minutes
  if (type.toLowerCase().includes('pre-work') && completed === 0) {
    return 60;
  }

  // For regular assignments, calculate the total time based on 45 minutes each
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
