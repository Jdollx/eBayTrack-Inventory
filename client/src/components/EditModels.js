import React, { useState, useEffect } from "react";

const EditModels = ({ model, closeModal, onSave }) => {
  const [localModel, setLocalModel] = useState(model);

  useEffect(() => {
    setLocalModel(model);
  }, [model]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalModel((prevModel) => ({
      ...prevModel,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(localModel); // Call the onSave function passed from the parent to update the model
    closeModal();
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
                Edit {localModel?.model_name}
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
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Model Name
                  </label>
                  <input
                    type="text"
                    name="model_name" // Ensure this matches your model property
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type product name"
                    value={localModel?.model_name || ""}
                    onChange={handleChange}
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
