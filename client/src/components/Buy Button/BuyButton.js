import React, { useState, useEffect } from 'react';

const BuyModel = ({ closeModal, onSave }) => {
    console.log("BuyModel component rendered");

    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [purchaseQuantity, setPurchaseQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [purchaseShipping, setPurchaseShipping] = useState('');
    const [purchaseFees, setPurchaseFees] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch('http://localhost:3000/models');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setModels(data);
            } catch (error) {
                console.error('Error fetching models. Make sure /models returns', error.message);
                setError('Error fetching models');
            }
        };
        fetchModels();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const purchaseResponse = await fetch('http://localhost:3000/purchases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model_id: selectedModel,
                    purchase_quantity: purchaseQuantity,
                    purchase_price: purchasePrice,
                    purchase_date: purchaseDate,
                    purchase_shipping: purchaseShipping,
                    purchase_fees: purchaseFees,
                }),
            });

            if (!purchaseResponse.ok) {
                throw new Error(`HTTP error! Status: ${purchaseResponse.status}`);
            }

            setSelectedModel('');
            setPurchaseQuantity('');
            setPurchasePrice('');
            setPurchaseDate('');
            setPurchaseShipping('');
            setPurchaseFees('');

            if (onSave) onSave(); // Optionally call onSave to notify parent of success
            closeModal(); // Close the modal after successful submission
        } catch (error) {
            console.error('Purchase error: ', error.message);
            setError('Error submitting purchase');
        }
    };

    return (
        <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-50"
        >
            <div className="relative w-full max-w-3xl p-6 max-h-screen">
                <div className="relative bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">Purchase Model</h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            onClick={closeModal}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form className="p-6" onSubmit={handleSubmit}>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <div className="mb-4">
                            <label htmlFor="model" className="block text-sm font-medium text-gray-900">Model</label>
                            <select
                                id="model"
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                required
                            >
                                <option value="">Select a model</option>
                                {models.map(model => (
                                    <option key={model.model_id} value={model.model_id}>{model.model_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="purchase_quantity" className="block text-sm font-medium text-gray-900">Quantity</label>
                            <input
                                type="number"
                                id="purchase_quantity"
                                value={purchaseQuantity}
                                onChange={(e) => setPurchaseQuantity(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="purchase_price" className="block text-sm font-medium text-gray-900">Price</label>
                            <input
                                type="number"
                                id="purchase_price"
                                value={purchasePrice}
                                onChange={(e) => setPurchasePrice(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="purchase_date" className="block text-sm font-medium text-gray-900">Date</label>
                            <input
                                type="date"
                                id="purchase_date"
                                value={purchaseDate}
                                onChange={(e) => setPurchaseDate(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="purchase_shipping" className="block text-sm font-medium text-gray-900">Shipping</label>
                            <input
                                type="number"
                                id="purchase_shipping"
                                value={purchaseShipping}
                                onChange={(e) => setPurchaseShipping(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="purchase_fees" className="block text-sm font-medium text-gray-900">Fees</label>
                            <input
                                type="number"
                                id="purchase_fees"
                                value={purchaseFees}
                                onChange={(e) => setPurchaseFees(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Submit Purchase
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-red-500 text-white rounded-lg ml-4"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BuyModel;
