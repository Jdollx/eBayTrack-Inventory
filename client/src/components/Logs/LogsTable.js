// ModalTable.js
import React from 'react';

const LogsTable = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-3/4 max-w-4xl relative">
        <button
          className="absolute top-2 right-2 text-gray-500 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Song List</h2>
        <table className="table-fixed w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Song</th>
              <th className="px-4 py-2 border">Artist</th>
              <th className="px-4 py-2 border">Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td className="px-4 py-2 border">Malcolm Lockyer</td>
              <td className="px-4 py-2 border">1961</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Witchy Woman</td>
              <td className="px-4 py-2 border">The Eagles</td>
              <td className="px-4 py-2 border">1972</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Shining Star</td>
              <td className="px-4 py-2 border">Earth, Wind, and Fire</td>
              <td className="px-4 py-2 border">1975</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default LogsTable;