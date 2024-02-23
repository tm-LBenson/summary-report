export function processData(rawData, selectedClass) {
  try {
    const rows = rawData.split('\n').map((row) => row.split('\t'));

    const weekAndPreworkHeadings = rows[3]?.slice(2);
    const topicHeadings = rows[4]?.slice(2); 


    const students = extractStudentData(
      rows,
      weekAndPreworkHeadings,
      topicHeadings
    );

    return {
      classId: selectedClass,
      students,
    };
  } catch (error) {
    console.error('Invalid data', error);
    return { classId: selectedClass, students: [] };
  }
}

function findStartOfStudentData(dataRows) {
  for (let i = 0; i < dataRows.length; i++) {
    if (
      dataRows[i].length > 1 &&
      dataRows[i][0].trim() === 'Student Name:' &&
      dataRows[i][1].trim() === 'Email'
    ) {
      return i + 1;
    }
  }
  return -1; 
}

function extractStudentData(dataRows, weekAndPreworkHeadings, topicHeadings) {
  let students = [];

  const actualWeekStartIndex = weekAndPreworkHeadings.findIndex((heading) =>
    heading.toLowerCase().startsWith('week 1')
  );

  const attendanceStartIndex = topicHeadings.findIndex((heading) =>
    heading.toLowerCase().startsWith('attendance')
  );

  const studentDataStartIndex = findStartOfStudentData(dataRows);

  if (studentDataStartIndex === -1) {
    throw new Error("Couldn't find the start of student data.");
  }
  const studentRows = dataRows.slice(studentDataStartIndex);

  studentRows.forEach((row) => {
    let cleanedRow = row.filter((cell) => cell.trim() !== '');

    if (cleanedRow.length > 2 && cleanedRow[1].includes('@')) {
      let student = {
        name: cleanedRow[0],
        email: cleanedRow[1],
        coursework: [],
        notes: cleanedRow.at(-1), 
      };

      for (let i = 0; i < actualWeekStartIndex; i++) {
        student.coursework.push({
          type: weekAndPreworkHeadings[i],
          topic: topicHeadings[i],
          result: cleanedRow[i + 2], 
          attendance: 'N/A',
        });
      }

      for (let i = actualWeekStartIndex; i < attendanceStartIndex; i++) {
        // Process weekly coursework data.
        let attendance =
          cleanedRow[attendanceStartIndex + (i - actualWeekStartIndex) + 2] ||
          '0 of 0';
        student.coursework.push({
          type: weekAndPreworkHeadings[i],
          topic: topicHeadings[i],
          result: cleanedRow[i + 2], 
          attendance: attendance,
        });
      }

      students.push(student);
    }
  });

  return students;
}
