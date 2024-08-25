import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const SearchBarLogic = ({ model_name, setModel_Name }) => {
  const [suggestions, setSuggestions] = useState([]);

  // Function to fetch search suggestions
  const getSearches = async (query) => {
    try {
      const response = await fetch(`http://localhost:3000/api/search?query=${query}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    }
  };

  // Autosuggest will call this function every time you need to update suggestions.
  const onSuggestionsFetchRequested = ({ value }) => {
    getSearches(value);  // Fetch suggestions based on the input value
  };

  // Autosuggest will call this function when you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);  // Clear suggestions
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  const getSuggestionValue = suggestion => suggestion.model_name;

  // Render each suggestion
  const renderSuggestion = suggestion => {
    // Construct the image URL only if model_image is present and starts with 'http'
    const imageUrl = suggestion.model_image
      ? (suggestion.model_image.startsWith('http')
          ? suggestion.model_image
          : `http://localhost:3000${suggestion.model_image}`)
      : null;

    return (
      <div className="flex items-start mb-4 border-b border-gray-300 pb-4">
        {/* Image */}
        <div className="flex-shrink-0 mr-4">
          <img
            src={imageUrl}
            alt={suggestion.model_name}
            className="w-16 h-16 object-cover rounded-lg"
          />
        </div>
        
        {/* Text content */}
        <div className="flex-1">
          <div className="text-black text-lg font-semibold">{suggestion.model_name}</div>
          <div className="text-gray-500 text-sm">{suggestion.model_color}</div>
        </div>
      </div>
    );
  };

  // Define input props for Autosuggest
  const inputProps = {
    placeholder: "Search inventory...",
    value: model_name,
    onChange: (e, { newValue }) => setModel_Name(newValue),
    className: "block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default SearchBarLogic;
