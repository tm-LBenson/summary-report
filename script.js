'use strict';

function processData() {
  const preworkCount = parseInt(document.getElementById('preworkCount').value);
  const weekCount = parseInt(document.getElementById('weekCount').value);
  const headingsInput = document.getElementById('headings').value;
  const studentDataInput = document.getElementById('studentData').value;
  const attendanceDataInput = document.getElementById('attendanceData').value;

  const headings = parseData(headingsInput);
  const studentData = parseData(studentDataInput);
  const attendanceData = parseAttendanceData(attendanceDataInput, weekCount);

  const summaryHtml = generateSummary(
    headings,
    studentData,
    attendanceData,
    weekCount,
    preworkCount
  );
  document.getElementById('summaryPage').innerHTML = summaryHtml;
}

function parseData(inputData) {
  return inputData.split('\t'); 
}

function parseAttendanceData(inputData, weekCount) {
  const rawAttendance = inputData.split('\t');
  let structuredAttendance = [];
  for (let i = 0; i < weekCount; i++) {
    structuredAttendance.push(
      rawAttendance[i] ? rawAttendance[i] : 'Data not available'
    );
  }
  return structuredAttendance;
}

function generateSummary(
  headings,
  studentData,
  attendanceData,
  weekCount,
  preworkCount
) {
  let summary = `<h2>Summary for ${studentData[0]}</h2>`;
  summary += `<p>Email: ${studentData[1]}</p>`;
  summary += `<h3>Prework Assignments</h3><ul>`;

  for (let i = 2; i < 2 + preworkCount; i++) {
    summary += `<li>${headings[i]}: ${formatData(studentData[i])}</li>`;
  }
  summary += '</ul>';

  summary += '<h3>Weekly Assignments</h3><ul>';
  for (let i = 2 + preworkCount; i < 2 + preworkCount + weekCount; i++) {
    summary += `<li>${headings[i]}: ${formatData(studentData[i])}</li>`;
  }
  summary += '</ul>';

  summary += `<h3>Attendance</h3><ul>`;
  for (let i = 0; i < weekCount; i++) {
    summary += `<li>Week ${i + 1}: ${attendanceData[i]}</li>`;
  }
  summary += '</ul>';

  return summary;
}

function formatData(data) {
  if (data === '0') {
    return 'No submissions';
  } else if (data === 'PASS') {
    return 'All assignments completed';
  } else if (data === 'NOT GRADED') {
    return 'Grade pending';
  } else {
    return `${data} assignments completed`;
  }
}


