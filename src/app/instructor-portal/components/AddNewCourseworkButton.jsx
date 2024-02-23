const AddNewCourseworkButton = ({ onClick }) => {
  return (
    <div className="w-1/3 h-60 rounded overflow-hidden shadow-lg bg-white m-4 p-8 flex justify-center items-center ">
      <button
        className="text-white bg-blue-400 cursor-pointer transition-colors duration-300 hover:bg-blue-700 font-bold py-1 px-6 rounded-xl text-6xl"
        onClick={onClick}
      >
        +
      </button>
    </div>
  );
};

export default AddNewCourseworkButton;
