export function processData(rawData, selectedClass) {
  try {
    const rows = rawData.split('\n').map((row) => row.split('\t'));

    const weekAndPreworkHeadings = rows[0]?.slice(2); // Starting from C4
    const topicHeadings = rows[1]?.slice(2); // Starting from C5
    const studentsData = rows.slice(5); // Student data starts from row 6
    console.log(weekAndPreworkHeadings, topicHeadings);
    const students = extractStudentData(
      studentsData,
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

function extractStudentData(dataRows, weekAndPreworkHeadings, topicHeadings) {
  let students = [];

  dataRows.forEach((row) => {
    while (row.length > 0 && row[row.length - 1].trim() === '') row.pop();
    if (row.length > 2 && row[0].trim() !== '') {
      let student = {
        name: row[0].trim(),
        email: row[1].trim(),
        coursework: [],
        notes: row[row.length - 1].trim() || '',
      };

      weekAndPreworkHeadings.forEach((heading, index) => {
        let type = heading.trim();
        let topic = topicHeadings[index].trim();
        let result = row[index + 2].trim();
        let attendance = 'N/A';

        student.coursework.push({ type, topic, result, attendance });
      });

      students.push(student);
    }
  });

  return students;
}
