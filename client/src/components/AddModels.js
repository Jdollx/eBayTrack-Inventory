import React, { useState } from 'react';

const AddModels = () => {
  const [model_name, setModel_Name] = useState('');
  const [model_image, setModelImage] = useState(null);
  const [model_color, setModelColor] = useState('');
  const [model_quantity, setModel_Quantity] = useState('');
  const [purchase_date, setPurchase_Date] = useState('');
  const [purchase_price, setPurchase_Price] = useState('');
  const [tags, setTags] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Add the new model with purchase date
      const formData = new FormData();
      formData.append("model_name", model_name);
      formData.append("model_image", model_image);
      formData.append("model_color", model_color);
      formData.append("model_quantity", model_quantity);
      formData.append("purchase_date", purchase_date);
      formData.append("purchase_price", purchase_price);
      formData.append("tags", tags);

      const modelResponse = await fetch("http://localhost:3000/models", {
        method: "POST",
        body: formData,
      });

      const newModel = await modelResponse.json();

      if (!newModel.model_id) {
        throw new Error("Failed to create model");
      }

      // After successful submission
      closeModal();
      window.location = "/";
    } catch (error) {
      console.error("Error saving model:", error.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded"
          onClick={openModal}
        >
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
                <h3 className="text-lg font-semibold text-gray-900">
                  Add New Model
                </h3>
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

              <form
                className="p-6"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="flex gap-4 mb-4">
                  <div className="flex flex-col items-center w-1/3">
                    {model_image ? (
                      <img
                        src={URL.createObjectURL(model_image)}
                        alt="Model"
                        className="object-cover w-full h-40 rounded-lg"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-52 bg-gray-200 rounded-lg">
                        <span className="text-gray-500">
                          No photo available
                        </span>
                      </div>
                    )}
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 mt-2"
                      id="file_input"
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setModelImage(e.target.files[0]);
                        }
                      }}
                    />
                  </div>

                  <div className="flex flex-col w-2/3">
                    <div className="mb-4">
                      <label
                        htmlFor="model_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Model Name:
                      </label>
                      <input
                        type="text"
                        id="model_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Type model name"
                        value={model_name}
                        onChange={(e) => setModel_Name(e.target.value)}
                        required
                      />
                    </div>



                    <div className="mb-4">
                      <label
                        htmlFor="quantity-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Quantity:
                      </label>
                      <input
                        type="number"
                        id="quantity-input"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter quantity"
                        value={model_quantity}
                        onChange={(e) => setModel_Quantity(e.target.value)}
                        required
                      />
                    </div>


                    
                    <div className="mb-4">
                      <label
                        htmlFor="purchase-date"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Purchase Date:
                      </label>
                      <input
                        type="date"
                        id="purchase-date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={purchase_date}
                        onChange={(e) => setPurchase_Date(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>


                <div className="mb-4">
                    <label
                    htmlFor="model_name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    >
                    Purchase Price:
                    </label>
                    <input
                    type="number"
                    id="purchase_price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="0.00"
                    step="0.01"
                    value={purchase_price}
                    onChange={(e) => setPurchase_Price(e.target.value)}
                    required
                    />
                </div>


                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Save changes
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
