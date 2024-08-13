import React, { useState } from "react";

const AddModels = () => {
    // initiates input to empty string
    const [model_name, setModel_Name] = useState("");

    const onSubmitForm = async(e) => {
        try {
            // prevents page refresh when form submitted 
            e.preventDefault();
            const body = {model_name};
            // adding data, pull from create model
            const response = await fetch("http://localhost:3000/models", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        window.location = "/";
        } catch (error) {
            console.error(error.Message)
            
        }
    }


    return (
      <>
          {/* Title */}
          <div className="flex justify-center mt-16">
              <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center">
                  Models
              </h1>
          </div>

          {/* Form with input bar + button */}
          <form className="max-w-md mx-auto" onSubmit={onSubmitForm}>
              <label 
                  htmlFor="default-search" 
                  className="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                  Add
              </label>
              <div className="relative mt-8">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg 
                          className="w-4 h-4 text-gray-500" 
                          aria-hidden="true" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 20 20"
                      >
                          <path 
                              stroke="currentColor" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                      </svg>
                  </div>
                  <input 
                      type="Add" 
                      value={model_name} 
                      onChange={e => setModel_Name(e.target.value)}
                      id="default-search" 
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Add a model..." 
                      required 
                  />
                  <button 
                      type="submit" 
                      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                      Add
                  </button>
              </div>
          </form>
      </>
  );
};

export default AddModels;