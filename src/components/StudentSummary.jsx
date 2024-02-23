import CourseworkCard from './CourseworkCard';

const StudentSummary = ({ student, allowEdit }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {student.coursework?.map((course, index) => (
        <CourseworkCard allowEdit={allowEdit} key={index} course={course} />
      ))}
    </div>
  );
};

export default StudentSummary;
