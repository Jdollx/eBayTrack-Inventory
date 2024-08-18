import React, { useEffect, useState } from "react";
import EditModels from "./EditModels";
import AddModels from "./AddModels";

const ListModels = () => {
  const [models, setModels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);

  // Function to format date as mm/dd/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const deleteModel = async (id) => {
    try {
      await fetch(`http://localhost:3000/models/${id}`, {
        method: "DELETE",
      });
      setModels(models.filter((model) => model.model_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  // fetches models
  const getModels = async () => {
    try {
      const response = await fetch("http://localhost:3000/models");
      const jsonData = await response.json();
      setModels(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getModels();
  }, []);


  // opens and closes edit modal
  const openModal = (model) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedModel(null);
  };

  const handleSave = async (updatedModel) => {
    try {
      await fetch(`http://localhost:3000/models/${updatedModel.model_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedModel),
      });
      setModels(models.map((model) =>
        model.model_id === updatedModel.model_id ? updatedModel : model
      ));
    } catch (error) {
      console.error(error.message);
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
            





            {/* card text with info */}
            <h3 className="text-left text-lg font-semibold mb-2">{model.model_name}</h3>
            <p className="text-left">Quantity: {model.model_quantity}</p>
            <p className="text-left">Purchase Date: {formatDate(model.purchase_date)}</p>
            <div className="flex gap-2 mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded">Logs</button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => openModal(model)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteModel(model.model_id)}
              >
                Delete
              </button>
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
    </div>
  );
};

export default ListModels;
