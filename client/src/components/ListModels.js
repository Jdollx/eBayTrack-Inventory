import React, { useEffect, useState } from "react";
import EditModels from "./EditModels";
import AddModels from "./AddModels";
import LogsTable from "./Logs/LogsTable";

const ListModels = () => {
  const [models, setModels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [tags, setTags] = useState({});
  const [modelTags, setModelTags] = useState({});
  const [isLogsTableOpen, setIsLogsTableOpen] = useState(false);

  // Function to format date as mm/dd/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle missing date
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Function to delete a model
  const deleteModel = async (id) => {
    try {
      await fetch(`http://localhost:3000/models/${id}`, {
        method: "DELETE",
      });
      setModels((prevModels) => prevModels.filter((model) => model.model_id !== id));
    } catch (error) {
      console.error("Error deleting model:", error.message);
    }
  };

  // Function to fetch models
  const getModels = async () => {
    try {
      const response = await fetch("http://localhost:3000/models");
      if (!response.ok) throw new Error("Network response was not ok.");
      const jsonData = await response.json();
      // Ensure no duplicates
      const uniqueModels = Array.from(new Map(jsonData.map(model => [model.model_id, model])).values());
      setModels(uniqueModels);
    } catch (error) {
      console.error("Error fetching models:", error.message);
    }
  };

  // Function to fetch tags and their associations -- needed for styling 
  const getTags = async () => {
    try {
      // Fetch tags
      const tagsResponse = await fetch('http://localhost:3000/tags');
      if (!tagsResponse.ok) throw new Error('Network response was not ok.');
      const tagsData = await tagsResponse.json();
      console.log('Tags data:', tagsData);
  
      // Transform tags data
      const tagsMap = tagsData.reduce((acc, { tag_id, tag_name, bgcolor, textcolor, bordercolor }) => {
        acc[tag_id] = { tag_name, bgcolor, textcolor, bordercolor };
        return acc;
      }, {});
      setTags(tagsMap);
  
      // Fetch model-tag associations if in a separate endpoint
      const associationsResponse = await fetch('http://localhost:3000/model_tags');
      if (!associationsResponse.ok) throw new Error('Network response was not ok.');
      const associationsData = await associationsResponse.json();
      console.log('Associations data:', associationsData);
  
      // Transform model-tag associations
      const modelTagsMap = associationsData.reduce((acc, { model_id, tag_id }) => {
        if (!acc[model_id]) acc[model_id] = [];
        if (tagsMap[tag_id]) {
          acc[model_id].push(tagsMap[tag_id]);
        }
        return acc;
      }, {});
      console.log('Model Tags Map:', modelTagsMap);
      setModelTags(modelTagsMap);
    } catch (error) {
      console.error('Error fetching tags or associations:', error.message);
    }
  };
  

  useEffect(() => {
    getModels();
    getTags();
  }, []);

  // Functions to handle modal open/close
  const openEditModal = (model) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedModel(null);
  };

  // Function to handle saving updates
  const handleSave = async (updatedModel) => {
    try {
      await fetch(`http://localhost:3000/models/${updatedModel.model_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedModel),
      });
      setModels((prevModels) =>
        prevModels.map((model) =>
          model.model_id === updatedModel.model_id ? updatedModel : model
        )
      );
      closeModal(); // Close the modal after saving
    } catch (error) {
      console.error("Error updating model:", error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white mt-16">
      <ul id="model-list" className="flex flex-wrap justify-center gap-10 w-full">
        {models.map((model) => (
          <li key={model.model_id} className="flex flex-col p-4 border rounded shadow-md w-64">
  {/* Conditionally render the image or a placeholder */}
  {model.model_image ? (
    <img
      src={`http://localhost:3000${model.model_image}`}
      alt={model.model_name}
      className="w-full h-52 object-cover mb-4 rounded-lg"
    />
  ) : (
    <div className="w-full h-52 bg-gray-200 flex items-center justify-center mb-4 rounded-lg">
      <span className="text-gray-500">No Image Available</span>
    </div>
  )}

  {/* Card text with info */}
  <h3 className="text-left text-2xl font-semibold">{model.model_name}</h3>
  <h4 className="text-left text-xl font-semibold mb-2 text-gray-400">{model.model_color}</h4>
  <p className="text-left">Quantity: {model.model_quantity}</p>
  <p className="text-left">Purchase Date: {formatDate(model.purchase_date)}</p>
  <p className="text-left">Purchase Price: ${model.purchase_price}</p>
  <p className="text-left">Sale Date: {formatDate(model.sale_date)}</p>
  <p className="text-left">Sale Price: ${model.sale_price}</p>

  {/* Tags */}
  <p>Tags:</p>
  <div className="tags flex flex-wrap gap-2 rounded mb-4">
    {modelTags[model.model_id] && modelTags[model.model_id].length > 0 ? (
      modelTags[model.model_id].map(tag => (
        <span
          key={tag.tag_id}
          className={`relative inline-flex items-center text-xs font-medium px-3 py-1 rounded ${tag.bgcolor} ${tag.textcolor} border ${tag.bordercolor}`}
        >
          {tag.tag_name}
        </span>
      ))
    ) : (
      <div>No tags available</div>
    )}
  </div>

{/* Button container */}
<div className="flex flex-col gap-2 mt-10">
  {/* Buy and Sell buttons */}
  <div className="flex gap-2 mb-2">
    <button
      className="bg-green-500 text-white px-4 py-2 rounded flex-1"
      onClick={() => { /* Buy functionality here */ }}
    >
      Buy
    </button>
    <button
      className="bg-red-500 text-white px-4 py-2 rounded flex-1"
      onClick={() => { /* Sell functionality here */ }}
    >
      Sell
    </button>
  </div>

  {/* Functional text links with separators */}
  <div className="flex justify-center gap-2">
    <button
      className="text-gray-400 px-3 py-0.5"
      onClick={() => setIsLogsTableOpen(true)} // Open LogsTable
    >
      Logs
    </button>
    <span className="text-gray-500 py-0.5">|</span>
    <button
      className="text-gray-400 px-3 py-0.5"
      onClick={() => openEditModal(model)}
    >
      Edit
    </button>
    <span className="text-gray-500 py-0.5">|</span>
    <button
      className="text-gray-400 px-3 py-0.5"
      onClick={() => deleteModel(model.model_id)}
    >
      Delete
    </button>
  </div>
</div>



</li>

        ))}
      </ul>

      {isModalOpen && (
        <EditModels
          model={selectedModel}
          closeModal={closeModal}
          onSave={handleSave}
        />
      )}
      {isLogsTableOpen && (
      <LogsTable
          isOpen={isLogsTableOpen}
          onClose={() => setIsLogsTableOpen(false)}
        />
      )}
    </div>
  );
};

export default ListModels;
