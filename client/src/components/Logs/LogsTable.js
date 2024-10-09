// ModalTable.js
import React, {useState, useEffect} from 'react';

const LogsTable = ({ isOpen, onClose }) => {
  const [models, setModels] = useState([]);
  const [transactions, setTransactions] =useState([]);


  const getModel = async () => {
    try {
      const response = await fetch(`http://localhost:3000/models`, {
        method: "GET",
      });

      const data = await response.json();
      setModels(data);
  
    } catch (error) {
      console.error("Error getting model:", error.message);
    }
  };


  const getTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:3000/transactions`, {
        method: "GET",
      });
      const data = await response.json();
      setTransactions(data);
  
    } catch (error) {
      console.error("Error getting model:", error.message);
    }
  };
  
      useEffect(() => {
        if (isOpen) {
          getModel();
          getTransactions();
        }
      }, [isOpen]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-3/4 max-w-4xl relative overflow-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">{models.length > 0 ? `${models[0].model_name} History` : "Model History"}</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Transaction</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Profit/Loss</th>
              <th className="px-4 py-2 border">Tags</th>
            </tr>
          </thead>
          <tbody>
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <tr key={transaction.transaction_id}>
              <td className="px-4 py-2 border">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{transaction.transaction_type === 1 ? 'Purchase' : 'Sale'}</td>
              <td className="px-4 py-2 border">{transaction.transaction_quantity}</td>
              <td className="px-4 py-2 border">{transaction.transaction_price}</td>
              <td className="px-4 py-2 border">{transaction.transaction_profit}</td>
              <td className="px-4 py-2 border">[Tags Placeholder]</td>
            </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 border text-center">
                No transactions available
              </td>
            </tr>
          )}
        </tbody>
        </table>
      </div>
      <div className="inset-0 bg-black rounded-lg opacity-50"></div>
    </div>
  );
};

export default LogsTable;
