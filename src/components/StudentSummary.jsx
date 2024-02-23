import CourseworkCard from './CourseworkCard';

const StudentSummary = ({ student }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {console.log(student)}
      {student.coursework?.map((course, index) => (
        <CourseworkCard key={index} course={course} />
      ))}
    </div>
  );
};

export default StudentSummary;
