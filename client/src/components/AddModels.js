import React, { useState } from 'react';
import TagDropdown from './Tags/TagDropdown';

const AddModels = () => {
  const [modelName, setModelName] = useState('');
  const [modelImage, setModelImage] = useState(null);
  const [modelQuantity, setModelQuantity] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('model_name', modelName);
      formData.append('model_image', modelImage);
      formData.append('model_quantity', modelQuantity);
      formData.append('purchase_date', purchaseDate);
      formData.append('purchase_price', purchasePrice);
      formData.append('sale_date', saleDate);
      formData.append('sale_price', salePrice);
      formData.append('tags', JSON.stringify(selectedTags)); // Convert selectedTags to JSON string

      const modelResponse = await fetch('http://localhost:3000/models', {
        method: 'POST',
        body: formData,
      });

      const newModel = await modelResponse.json();

      if (newModel.model_id) {
        const tagAssociations = selectedTags.map(async (tag_id) => {
          await fetch(`http://localhost:3000/models/${newModel.model_id}/tags`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag_id }),
          });
        });
        await Promise.all(tagAssociations);
        closeModal();
        window.location = '/';
      } else {
        throw new Error('Failed to create model');
      }
    } catch (error) {
      console.error('Error saving model:', error.message);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={openModal}>
          Add New Model
        </button>
      </div>

      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-50"
        >
          <div className="relative w-full max-w-3xl p-6 max-h-screen">
            <div className="relative bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">Add New Model</h3>
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

              <form className="p-6" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex gap-4 mb-4">
                  <div className="flex flex-col items-center w-1/3">
                    {modelImage ? (
                      <img
                        src={URL.createObjectURL(modelImage)}
                        alt="Model"
                        className="object-cover w-full h-40 rounded-lg"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-52 bg-gray-200 rounded-lg">
                        <span className="text-gray-500">No photo available</span>
                      </div>
                    )}
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 mt-2"
                      id="file_input"
                      accept="image/*"
                      type="file"
                      onChange={(e) => setModelImage(e.target.files[0])}
                    />
                  </div>

                  <div className="flex flex-col w-2/3">
                    <div className="mb-4">
                      <label htmlFor="model_name" className="block mb-2 text-sm font-medium text-gray-900">
                        Model Name:
                      </label>
                      <input
                        type="text"
                        id="model_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Type model name"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900">
                        Quantity:
                      </label>
                      <input
                        type="number"
                        id="quantity-input"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter quantity"
                        value={modelQuantity}
                        onChange={(e) => setModelQuantity(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="purchase-date" className="block mb-2 text-sm font-medium text-gray-900">
                        Purchase Date:
                      </label>
                      <input
                        type="date"
                        id="purchase-date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        value={purchaseDate}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="purchase-price" className="block mb-2 text-sm font-medium text-gray-900">
                        Purchase Price:
                      </label>
                      <input
                        type="number"
                        id="purchase-price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Enter purchase price"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="sale-date" className="block mb-2 text-sm font-medium text-gray-900">
                        Sale Date:
                      </label>
                      <input
                        type="date"
                        id="sale-date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        value={saleDate}
                        onChange={(e) => setSaleDate(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="sale-price" className="block mb-2 text-sm font-medium text-gray-900">
                        Sale Price:
                      </label>
                      <input
                        type="number"
                        id="sale-price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Enter sale price"
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                      />
                    </div>

                    <TagDropdown selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add New Model
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModels;
