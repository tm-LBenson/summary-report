// components/SpreadsheetInputForm.js
import React, { useState } from 'react';
import { processData } from './processData';

const SpreadsheetInputForm = ({ classId, submitSpreadsheet }) => {
  const [spreadsheetData, setSpreadsheetData] = useState('');

  const handleDataChange = (e) => {
    setSpreadsheetData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const structuredData = processData(spreadsheetData, classId);

    submitSpreadsheet(structuredData);
  };

  return (
    <div className="flex">
      <form
        className="mx-auto flex justify-center gap-20 align-center  w-full"
        onSubmit={handleSubmit}
      >
        <textarea
          value={spreadsheetData}
          onChange={handleDataChange}
          rows="2"
          placeholder="Paste spreadsheet data here"
          className="w-96 h-14 border border-gray-300 p-2"
        ></textarea>
        <button
          type="submit"
          className="h-14 w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SpreadsheetInputForm;
