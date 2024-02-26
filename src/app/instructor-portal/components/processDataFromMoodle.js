import {parse} from 'csv-parse/browser/esm/sync';
// const { parse } = require("csv-parse/sync");

function inputFromText(moodleInput) {
  const rows = parse(moodleInput, { delimiter: "\t", trim: true });
  return rows;
}

function findTopicsFromSheet(rows) {
  const headers = rows[0];
  // find Topics...
  // example header: CSS total (Real)
  // non-example: Assignment: CSS Reading Assignment (Real)
  // TODO: We should also allow for this example:
  // example: CSS total (Percent)
  // Reg Ex captures the "topic" or "Moodle Category" by looking for "total" in the header
  const regexForTopic = /(.+) total \(Real\)/;
  const topics = [];
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    let matched = header.match(regexForTopic);
    console.log(header);
    if (matched) {
      let name = matched[1];
      let index = i;
      topics.push({ name, index });
    }
  }
  return topics;
}

function buildStudents(topics, rows) {
  // build objects for Summary-Report
  const students = [];
  // skip header
  for (let i = 1; i < rows.length; i++) {
    // First name, Last name, ID number, Insitution, Department Email address
    let record = rows[i];
    let name = `${record[0]} ${record[1]}`;
    let moodleId = record[2];
    let email = record[5];
    let coursework = [];
    let notes = "";
    for (const topic of topics) {
      let i = topic.index;
      let topicName = topic.name;
      let result = record[i];
      coursework.push({
        type: topicName,
        topic: topicName,
        result: result,
        attendance: "N/A",
      });
    }
    const student = {
      name,
      email,
      moodleId,
      coursework,
      notes,
    };
    students.push(student);
  }
  return students;
}

// import moodleInput as tab separated data
// i.e. copied from Excel sheet.
export function importResultsFromMoodle(moodleInput) {
  console.log(moodleInput);
  const rows = inputFromText(moodleInput);
  console.log(rows);
  const topics = findTopicsFromSheet(rows);
  const students = buildStudents(topics, rows);
  return students;
}

// usage: 
// moodleInput is in tab separated values
// const students = importResultsFromMoodle(moodleInput);

// module.exports = { importResultsFromMoodle };
