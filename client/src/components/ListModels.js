import React, { useEffect, useState } from "react";

const ListModels = () => {
    // initializes models as an empty array
    const [models, setModels] = useState([]);

    // fetches models from the API
    const getModels = async () => {
        try {
            const response = await fetch("http://localhost:3000/models");
            const jsonData = await response.json();

            // updates state with the fetched models
            setModels(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    // calls getModels once on component mount
    useEffect(() => {
        getModels();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center bg-white mt-16">
            <ul id="model-list" className="flex flex-wrap justify-center gap-10 w-full">
                {models.map((model, index) => (
                    <li key={index} className="flex flex-col p-4 border rounded shadow-md w-64">
                        <img src={model.imageUrl} alt={model.model_name} className="w-full h-32 object-cover mb-4" />
                        <h3 className="text-left text-lg font-semibold mb-2">{model.model_name}</h3>
                        <p className="text-left">Quantity: {model.quantity}</p>
                        <div className="flex gap-2 mt-4">
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Logs</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );    
};

export default ListModels;
