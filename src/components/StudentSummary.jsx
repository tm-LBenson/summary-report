import { useEffect, useState } from 'react';
import CourseworkCard from './CourseworkCard';

const StudentSummary = ({
  student,
  allowEdit,
  onCourseUpdate,
  selectedClass,
  displayedData,
}) => {
  const [filtered, setFiltered] = useState(student);
  const data = displayedData.students.find(
    (element) => element.name === student.name
  );
  useEffect(() => setFiltered(data), [data]);

  return (
    <div className="flex flex-wrap justify-center">
      {filtered.coursework?.map((course, index) => (
        <CourseworkCard
          onCourseUpdate={onCourseUpdate}
          allowEdit={allowEdit}
          key={index}
          course={course}
          student={student}
          selectedClass={selectedClass}
          displayedData={displayedData}
        />
      ))}
    </div>
  );
};

export default StudentSummary;
