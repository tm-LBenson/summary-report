const CourseworkCard = ({ course }) => {
  const resultTagColor = (result) => {
    switch (result) {
      case 'PASS':
        return 'bg-green-200 ml-4 rounded-xl text-green-800';
      case 'NOT-GRADED':
        return 'bg-yellow-200 ml-4 rounded-xl text-yellow-800';
      default:
        return 'bg-gray-200 ml-4 rounded-xl text-gray-800';
    }
  };

  return (
    <div className="w-2/3 rounded overflow-hidden shadow-lg bg-white m-4 pb-8">
      <div className="px-6 flex flex-col gap-4 py-4">
        <div className="font-bold text-xl mb-2">
          {course.type} ({course.topic})
        </div>
        <p className="text-gray-700 text-base">
          Result:
          <span
            className={`inline-block px-3 py-1 text-sm font-semibold ${resultTagColor(
              course.result
            )}`}
          >
            {course.result}
          </span>
        </p>
        <p className="text-gray-700 text-base">
          Attendance: {course.attendance}
        </p>
        {course.attendance !== 'N/A' && (
          <p className="text-gray-700 text-base">
            Estimated catch-up time: {course.catchUpTime} minutes
          </p>
        )}
        {course.notes && (
          <p className="text-gray-700 text-base">Notes: {course.notes}</p>
        )}
      </div>
    </div>
  );
};

export default CourseworkCard;
