

export function weeklyReportHTML({grade, attendance, estimatedMinutesForCatchup
}){
    const {week, topic} = grade;
    const result = grade.grade;
    const minutes = estimatedMinutesForCatchup;
    const pass = grade.pass;
    const attendanceText = attendance ? attendance.grade : "N/A";

    return `
        <div class="card">
            <div class="card-header">
                ${week} / ${topic}
            </div>
            <div class="card-body">
                <p class="card=text">
                    result: ${result}
                </p>
                <p class="card=text">
                    Attendance: ${attendanceText} 
                </p>
                <p class="card=text">
                    Estimated catchup time: ${minutes} minutes
                </p>
            </div>
        </div>
    `
}

export function summaryReportHTML(student){
    const totalCatchUpTime = student.totalEstimatedMinutesForCatchup;
    const totalAttendance = student.totalAttendanceCount;
    const possibleAttendance = student.maxAttendanceCount
    return `
      <div class="col-md-12 mb-3">
        <div class="card">
          <div class="card-header">Notes and Summary</div>
          <div class="card-body">
            <p class="card-text">${student.notes}</p>
            <p class="card-text">Total Estimated Catch-Up Time: ${totalCatchUpTime} minutes</p>
            <p class="card-text">Total Attendance: ${totalAttendance}  / ${possibleAttendance} days</p>
          </div>
        </div>
      </div>
    </div>`;
}