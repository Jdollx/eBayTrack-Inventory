import React, { useState, useEffect } from 'react';

const SellModel = ({ model, closeModal, onSave }) => {
    const [models, setModels] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [selectedPurchase, setSelectedPurchase] = useState('');
    const [saleQuantity, setSaleQuantity] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [saleDate, setSaleDate] = useState('');
    const [saleShipping, setSaleShipping] = useState('');
    const [SaleFees, setSaleFees] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch('http://localhost:3000/models');
                const data = await response.json();
                setModels(data);
            } catch (error) {
                setError('Error fetching models');
            }
        };

        const fetchPurchases = async (modelId) => {
            try {
                const response = await fetch(`http://localhost:3000/purchases?model_id=${modelId}`);
                const data = await response.json();
                setPurchases(data);
            } catch (error) {
                setError('Error fetching purchases');
            }
        };

        fetchModels();
        if (model) fetchPurchases(model.model_id);
    }, [model]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate selected purchase
        if (!selectedPurchase) {
            setError('Please select a purchase.');
            return;
        }

        // Create the payload
        const payload = {
            model_id: model.model_id,
            purchase_id: selectedPurchase,
            sale_quantity: Number(saleQuantity),
            sale_date: saleDate,
            sale_price: Number(salePrice),
            sale_shipping: Number(saleShipping),
            sale_fees: Number(SaleFees)
        };

        console.log('Payload:', payload); // Log the payload for debugging

        try {
            const saleResponse = await fetch('http://localhost:3000/sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!saleResponse.ok) {
                throw new Error(`HTTP error! Status: ${saleResponse.status}`);
            }

            // Reset form states
            setSelectedPurchase('');
            setSaleQuantity('');
            setSalePrice('');
            setSaleDate('');
            setSaleShipping('');
            setSaleFees('');

            if (onSave) onSave();
            closeModal();
        } catch (error) {
            setError('Error submitting sale: ' + error.message);
        }
    };

    return (
        <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-50"
        >
            <div className="relative w-full max-w-3xl p-6 max-h-screen bg-white rounded-lg shadow-md">
                <div className="relative">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">Sell {model?.model_name || 'Model'}</h3>
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
                            <label htmlFor="model_name" className="block text-sm font-medium text-gray-900">Model:</label>
                            <input
                                type="text"
                                id="model_name"
                                value={model ? `${model.model_mold} > ${model.model_name} > ${model.model_color}` : 'Model'}
                                readOnly
                                className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg w-full p-2.5 cursor-not-allowed"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="selected_purchase" className="block text-sm font-medium text-gray-900">Select Purchase:</label>
                            <select
                                id="selected_purchase"
                                value={selectedPurchase}
                                onChange={(e) => setSelectedPurchase(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                required
                            >
                                <option value="">Select a purchase</option>
                                {purchases.map(purchase => (
                                    <option key={purchase.purchase_id} value={purchase.purchase_id}>
                                        {`Purchased on ${new Date(purchase.purchase_date).toLocaleDateString()} - Quantity: ${purchase.purchase_quantity} - Price: ${purchase.purchase_price}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="sale_quantity" className="block text-sm font-medium text-gray-900">Sale Quantity:</label>
                            <input
                                type="number"
                                id="sale_quantity"
                                value={saleQuantity}
                                onChange={(e) => setSaleQuantity(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="sale_price" className="block text-sm font-medium text-gray-900">Sale Price:</label>
                            <input
                                type="number"
                                id="sale_price"
                                value={salePrice}
                                onChange={(e) => setSalePrice(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="sale_date" className="block text-sm font-medium text-gray-900">Sale Date:</label>
                            <input
                                type="date"
                                id="sale_date"
                                value={saleDate}
                                onChange={(e) => setSaleDate(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="sale_shipping" className="block text-sm font-medium text-gray-900">Shipping Price:</label>
                            <input
                                type="number"
                                id="sale_shipping"
                                value={saleShipping}
                                onChange={(e) => setSaleShipping(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="sale_fees" className="block text-sm font-medium text-gray-900">Sale Fees:</label>
                            <input
                                type="number"
                                id="sale_fees"
                                value={SaleFees}
                                onChange={(e) => setSaleFees(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Submit Sale
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

export default SellModel;
