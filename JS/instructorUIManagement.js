'use strict';

import { patchData } from './patchData.js';
import { postData } from './postData.js';
import { toggleStudentList } from './staffUIManagement.js';

export function displayInstructorStudentList(students, classId) {
  const studentListDiv = document.getElementById('studentList');
  studentListDiv.innerHTML = '';
  students.forEach((student) => {
    console.log(student);
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-secondary', 'm-2');
    button.innerText = student.name;

    button.onclick = () => {
      toggleStudentList();
      return displayStudentSummary(student, classId);
    };
    studentListDiv.appendChild(button);
  });
}

function displayStudentSummary(student, classId) {
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

    const editButtonId = `edit-${course._id}`;
    // Render the course card
    summaryDiv.innerHTML += `
      <div class="col-md-6 mb-3">
        <div class="card">
          <div class="card-header">${course.type} (${
      course.topic
    })         <button id=${editButtonId} class="badge bg-secondary">Edit</button></div>
          <div class="card-body">
            <p class="card-text">Result: ${course.result}</p>
            <p class="card-text">Attendance: ${attendance}</p>
            ${
              attendance !== 'N/A'
                ? `<p class="card-text">Estimated catch-up time: ${catchUpTime} minutes</p>`
                : ''
            }
        ${course.notes ? `<p class="card-text">Notes: ${course.notes}</p>` : ''}
           
          </div>
        </div>
      <script>
      
      </script>
      </div>`;
  });

  // Add notes and summary
  summaryDiv.innerHTML += `
 <button id="new-topic type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-topic">
  Add Topic
</button>
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

  student.coursework.forEach((course) => {
    const editButtonId = `edit-${course._id}`;
    const editButton = document.getElementById(editButtonId);
    if (editButton) {
      editButton.onclick = () =>
        openEditModal(
          course.type,
          course.topic,
          classId,
          course,
          student.email
        );
    }
  });
  summaryDiv.style.display = 'block';
  const newTopicBtn = document.querySelector('#add-topic-btn');
  newTopicBtn.addEventListener('click', async () => {
    const newForm = document.querySelector('#add-new-form');
    const newTopic = {
      classId,
      studentEmail: student.email,
      coursework: {
        status: 'N/A',
        result: '0 of 0',
        attendance: '0 of 0',
        notes: '',
        topic: newForm.topic.value,
        type: newForm.type.value,
      },
    };
    await postData('summary-sheets/student/coursework', newTopic);
  });
}

function openEditModal(courseType, courseTopic, classId, courseData, email) {
  const modal = document.getElementById('editModal');
  const form = document.getElementById('editForm');

  form.innerHTML = `
  <h2>${courseData.type + '-' + courseData.topic}</h2>
<form id="editForm" class="needs-validation" novalidate>
  <input type="hidden" name="courseType" value="${courseType}">
  <input type="hidden" name="studentEmail" value="${email}">
  <input type="hidden" name="courseTopic" value="${courseTopic}">
  <input type="hidden" name="classId" value="${classId}">

  <div class="mb-3">
    <label for="result" class="form-label">Result:</label>
    <input type="text" class="form-control" name="result" id="result" value="${
      courseData.result
    }" required>
    <div class="invalid-feedback">
      Please provide a valid result.
    </div>
  </div>

  <div class="mb-3">
    <label for="attendance" class="form-label">Attendance:</label>
    <input type="text" class="form-control" name="attendance" id="attendance" value="${
      courseData.attendance
    }" required>
    <div class="invalid-feedback">
      Please provide attendance information.
    </div>
  </div>

  <div class="mb-3">
    <label for="status" class="form-label">Status:</label>
    <select class="form-select" name="status" id="status" required>
      <option value="N/A" ${
        courseData.status === 'N/A' ? 'selected' : ''
      }>N/A</option>
      <option value="PASS" ${
        courseData.status === 'PASS' ? 'selected' : ''
      }>PASS</option>
      <option value="NOT-GRADED" ${
        courseData.status === 'NOT-GRADED' ? 'selected' : ''
      }>NOT-GRADED</option>
      <option value="SOFT-FAIL" ${
        courseData.status === 'SOFT-FAIL' ? 'selected' : ''
      }>SOFT-FAIL</option>
      <option value="HARD-FAIL" ${
        courseData.status === 'HARD-FAIL' ? 'selected' : ''
      }>HARD-FAIL</option>
    </select>
    <div class="invalid-feedback">
      Please select a status.
    </div>
  </div>

  <div class="mb-3">
    <label for="notes" class="form-label">Notes:</label>
    <textarea class="form-control" name="notes" id="notes" rows="3">${
      courseData.notes || ''
    }</textarea>
    <div class="invalid-feedback">
      Please provide notes if applicable.
    </div>
  </div>

  <button type="submit" class="btn btn-primary">Save Changes</button>
</form>

  `;

  form.onsubmit = handleEditFormSubmit;

  modal.style.display = 'block';
  const closeButton = document.querySelector('.close');
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', () => {
    closeModal();
  });
}

async function handleEditFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const updatedCourseData = {
    classId: form.classId.value,
    studentEmail: form.studentEmail.value,
    type: form.courseType.value,
    topic: form.courseTopic.value,
    updates: {
      result: form.result.value,
      attendance: form.attendance.value,
      status: form.status.value,
      notes: form.notes.value,
    },
  };

  // Logic to update dataForApi with form data
  const response = await patchData(
    'summary-sheets/student/coursework',
    updatedCourseData
  );
  console.log(response);
  closeModal();
}

function closeModal() {
  const modal = document.getElementById('editModal');
  modal.style.display = 'none';
}

function estimateCatchUpTime(completed, total) {
  const assignmentsLeft = total - completed;
  if (assignmentsLeft === 0) return 0; // No catch-up time needed if there are no assignments left
  const timePerAssignment = 45; // Average time per assignment
  return assignmentsLeft * timePerAssignment; // Total catch up time
}

export function createAlert() {
  const div = document.createElement('div');
  div.innerHTML = `<div class="alert alert-success" role="alert">
  Class data successfully updated!
</div>`;
  return div;
}
