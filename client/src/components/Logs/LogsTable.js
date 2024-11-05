import React, { useState, useEffect } from 'react';

const LogsTable = ({ isOpen, onClose }) => {
  const [models, setModels] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);  // State to store sales
  const [tagsMap, setTagsMap] = useState({});

  const getModel = async () => {
    try {
      const response = await fetch(`http://localhost:3000/models`);
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error("Error getting model:", error.message);
    }
  };

  const getTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:3000/transactions`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error getting transactions:", error.message);
    }
  };

  const getPurchases = async () => {
    try {
      const response = await fetch(`http://localhost:3000/purchases`);
      const data = await response.json();
      setPurchases(data);
    } catch (error) {
      console.error("Error getting purchases:", error.message);
    }
  };

  const getSales = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sales`);
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error("Error getting sales:", error.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getModel();
      getTransactions();
      getPurchases();
      getSales();  // Fetch sales data
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
        <h2 className="text-xl font-semibold mb-4">
          {models.length > 0 ? `${models[0].model_name} History` : "Model History"}
        </h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Purchase ID</th>
              <th className="px-4 py-2 border">Sale ID</th> {/* Add Sale ID column */}
              <th className="px-4 py-2 border">Transaction</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Profit/Loss</th>
              <th className="px-4 py-2 border">Tags</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map(transaction => {
                let purchaseIds = []; // Array to hold matching purchase IDs
                let saleIds = []; // Array to hold matching sale IDs

                if (transaction.transaction_type === 1) {
                  const matchingPurchases = purchases.filter(p =>
                    p.model_id === transaction.model_id &&
                    new Date(p.purchase_date).toISOString().split('T')[0] === new Date(transaction.transaction_date).toISOString().split('T')[0]
                  );

                  purchaseIds = matchingPurchases.map(p => p.purchase_id);
                } else if (transaction.transaction_type === 0) {
                  const matchingSales = sales.filter(s =>
                    s.model_id === transaction.model_id &&
                    new Date(s.sale_date).toISOString().split('T')[0] === new Date(transaction.transaction_date).toISOString().split('T')[0]
                  );

                  saleIds = matchingSales.map(s => s.sale_id);
                  purchaseIds.push(transaction.purchase_id || 'N/A');
                }

                return (
                  <tr key={transaction.transaction_id}>
                    <td className="px-4 py-2 border">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border">{purchaseIds.length > 0 ? purchaseIds.join(', ') : 'N/A'}</td>
                    <td className="px-4 py-2 border">{saleIds.length > 0 ? saleIds.join(', ') : 'N/A'}</td> {/* Display Sale IDs */}
                    <td className="px-4 py-2 border">{transaction.transaction_type === 1 ? 'Purchase' : 'Sale'}</td>
                    <td className="px-4 py-2 border">{transaction.transaction_quantity}</td>
                    <td className="px-4 py-2 border">{transaction.transaction_price}</td>
                    <td className="px-4 py-2 border">{transaction.transaction_profit}</td>
                    <td className="px-4 py-2 border">{tagsMap[transaction.model_id] ? tagsMap[transaction.model_id].map(tag => tag.tag_name).join(', ') : 'Loading...'}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-2 border text-center">
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
