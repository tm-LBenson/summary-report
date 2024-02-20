const catchupTime = {
  absenceFactor: 120,
  incompleteFactor: 60,
  softFail: 120,
  hardFail: 240,
};

class AttendanceWeek {
  constructor({ week, topic, grade }) {
    this.week = week;
    this.topic = topic;
    this.grade = grade;
    if (topic.toLowerCase() === 'attendance') {
      const rec = grade.split(' of ');
      if (rec.length === 2) {
        this.total = parseInt(rec[1]);
        this.attended = parseInt(rec[0]);
        this.valid = true;
      }
    }
  }
  static isAttendanceCell(cell) {
    return cell.topic.toLowerCase() === 'attendance';
  }
}

class GradeWeek {
  constructor({ week, topic, grade }) {
    this.week = week;
    this.topic = topic;
    this.grade = grade;
    this.pass = grade === 'PASS' || grade === 'NOT-GRADED';
    if (!this.pass) {
      const grade = this.grade;
      this.incompleteAssignmentCount = 0;
      if (grade === '0') {
        // TODO: fix this magic number
        // default missing assignment count is 5?
        this.incompleteAssignmentCount = 5;
      }
      console.log(grade);
      const g = grade.split(' of ');
      if (g.length === 2) {
        const completed = parseInt(g[0], 10);
        const total = parseInt(g[1], 10);
        const missing = total - completed;
        if (!isNaN(missing)) {
          this.incompleteAssignmentCount = missing;
        }
      }
    }
    this.missingAssignments;
  }
  static isGradeCell(cell) {
    return cell.topic.toLowerCase() !== 'attendance' && cell.topic && cell.week;
  }
}

function calcWeekCatchup({ grade, attendance }) {
  let absence = 0;
  if (grade.pass) {
    return 0;
  } else if (grade.grade.toLowerCase() === 'soft fail') {
    return catchupTime.softFail;
  } else if (grade.grade.toLowerCase() === 'hard fail') {
    return catchupTime.hardFail;
  }
  if (attendance) {
    absence = attendance.total - attendance.attended;
  }
  let incompleteAssignmentCount = grade.incompleteAssignmentCount;
  const estimatedMinutesForCatchup =
    absence * catchupTime.absenceFactor +
    incompleteAssignmentCount * catchupTime.incompleteFactor;
  return estimatedMinutesForCatchup;
}

class Student {
  constructor(data) {
    this.studentName = data.row[0];
    this.studentEmail = data.row[1];
    const cellData = data.row.slice(2);
    const topicHeaders = data.topics.slice(2);
    const weekHeaders = data.weeks.slice(2);
    this.cells = [];
    this.totalEstimatedMinutesForCatchup = 0;
    this.totalAttendanceCount = 0;
    this.maxAttendanceCount = 0;
    for (let i = 0; i < topicHeaders.length; i++) {
      this.cells.push({
        week: weekHeaders[i].trim(),
        topic: topicHeaders[i].trim(),
        grade: cellData[i].trim(),
      });
    }
    this.attendance = {
      total: 0,
      attended: 0,
      record: [],
    };
    this.grades = [];
    for (const cell of this.cells) {
      if (AttendanceWeek.isAttendanceCell(cell)) {
        const att = new AttendanceWeek(cell);
        if (att.valid) {
          this.attendance.total += att.total;
          this.attendance.attended += att.attended;
          this.totalAttendanceCount += this.attendance.attended;
          this.maxAttendanceCount += this.attendance.total;
          this.attendance.record.push(att);
        }
      } else if (GradeWeek.isGradeCell(cell)) {
        this.grades.push(new GradeWeek(cell));
      } else {
        console.log(`Cell is not a grade or attendance cell: ${cell.topic}`);
      }
    }
    const attendanceHash = this.attendance.record.reduce((h, att) => {
      h[att.week] = att;
      return h;
    }, {});
    const weeklyReports = [];
    for (const grade of this.grades) {
      const report = {
        grade: grade,
        attendance: attendanceHash[grade.week],
      };
      const estimatedMinutesForCatchup = calcWeekCatchup(report);
      this.totalEstimatedMinutesForCatchup += estimatedMinutesForCatchup;
      report.estimatedMinutesForCatchup = estimatedMinutesForCatchup;
      weeklyReports.push(report);
    }
    this.weeklyReports = weeklyReports;
  }
}

function parseSheet(data) {
  const weeks = data[0];
  const topics = data[1];
  const students = [];
  for (let i = 2; i < data.length; i++) {
    students.push(
      new Student({
        weeks,
        topics,
        row: data[i],
      })
    );
  }
  return students;
}

export { parseSheet };
