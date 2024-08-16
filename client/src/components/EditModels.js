import React, { useState, useEffect } from "react";

const EditModels = ({ model: initialModel, closeModal, onSave }) => {
  // taking the initial model as the default
  const [model, setModel] = useState(initialModel.model_name);

  // handles when the initial model is changed
  useEffect(() => {
    setModel(initialModel.model_name);
  }, [initialModel]);

  // sends put request to update the initial model info in server
  const updateModel = async () => {
    try {
      const response = await fetch(`http://localhost:3000/models/${initialModel.model_id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_name: model,  // Update with the current state value
        }),
      });

      onSave({ ...initialModel, model_name: model });
      closeModal();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateModel();
  };

  return (
    <>
      {/* Main modal */}
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-50"
      >
        <div className="relative w-full max-w-md p-4 max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-md">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit {model}
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
            {/* Modal body */}
            <form className="p-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor={`model_name_${initialModel.model_id}`}  // Unique ID using model_id
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Model Name
                  </label>
                  <input
                    type="text"
                    name="model_name"
                    id={`model_name_${initialModel.model_id}`}  // Unique ID
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type product name"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                  />
                </div>
                {/* Other input fields... */}
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
    </>
  );
};

export default EditModels;
