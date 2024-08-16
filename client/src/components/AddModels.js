import React, { useState } from "react";

const AddModels = () => {
  // Initiate state with empty strings
  const [model_name, setModel_Name] = useState("");
  const [model_image, setModelImage] = useState("");
  const [model_color, setModel_Color] = useState("");
  const [model_quantity, setModel_Quantity] = useState("");
  const [purchase_date, setPurchaseDate] = useState("");
  const [purchase_price, setPurchasePrice] = useState("");
  const [purchase_quantity, setPurchaseQuantity] = useState("");
  const [sale_date, setSaleDate] = useState("");
  const [sale_price, setSalePrice] = useState("");
  const [sale_quantity, setSaleQuantity] = useState("");
  const [tags, setTags] = useState("");

  // Function to add a new model
  const AddNewModels = async () => {
    try {
      const body = {
        model_name,
        model_image,
        model_color,
        model_quantity,
        purchase_date,
        purchase_price,
        purchase_quantity,
        sale_date,
        sale_price,
        sale_quantity,
        tags
      };

      // Make POST request to add input to server
      const response = await fetch("http://localhost:3000/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

        const newModel = await response.json();
        console.log("Model saved:", newModel);
        closeModal();
        window.location = "/";
    } catch (error) {
      console.error("Error saving model:", error.message);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);

  const openModal = (model) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedModel(null);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    AddNewModels();
  };

  return (
    <>
        {/* Fixed button in the top right corner */}
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
          <div className="relative w-full max-w-md p-4 max-h-full">
            <div className="relative bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                  Add New
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
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form className="p-4" onSubmit={HandleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="model_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Model Name 
                    </label>
                    <input
                      type="text"
                      id="model_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type product name"
                      value={model_name}
                      onChange={(e) => setModel_Name(e.target.value)}
                      required
                    />
                  </div>
                  {/* Add other input fields here */}
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
                    ></path>
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
