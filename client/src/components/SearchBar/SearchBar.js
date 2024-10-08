import React, { useState } from "react";
import SearchBarLogic from "./SearchBarLogic";

const SearchBar = () => {
  const [model_name, setModel_Name] = useState(""); // Initialize state for the input field

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log("Search for:", model_name);
    // Handle form submission logic here
  };

  return (
    <>
      {/* Form with input bar + button */}
      <form className="max-w-md mx-auto" onSubmit={onSubmitForm}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
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
          
          {/* Replace input field with Autosuggest logic */}
          <SearchBarLogic
            model_name={model_name}
            setModel_Name={setModel_Name}
          />
          
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            style={{ position: "absolute", right: "0", top: "0", bottom: "0", zIndex: "10" }}
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
