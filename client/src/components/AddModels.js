import React, { useState } from "react";

const AddModels = () => {
    // initiates input to empty string
    const [model_name, setModel_Name]= useState("");
    const [model_image, setModelImage] = useState("")
    const [model_color, setModel_Color] = useState("")
    const [model_quantity, setModel_Quantity] = useState("");
    const [purchase_date, setPurchaseDate] = useState("");
    const [purchase_price, setPurchasePrice] = useState("");
    const [purchase_quantity, setPurchaseQuantity] = useState("");
    const [sale_date, setSaleDate] = useState("");
    const [sale_price, setSalePrice] = useState("");
    const [sale_quantity, setSaleQuantity] = useState("");
    const [tags, setTags] = useState("");

    const onSubmitForm = async(e) => {
        try {
            // prevents page refresh when form submitted 
            e.preventDefault();
            const body = {model_name, model_image, model_color, model_quantity, purchase_date, purchase_price, purchase_quantity, sale_date, sale_price,
            sale_quantity, tags};
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
            {/* Close Button */}
            <button
                type="button"
                className="fixed top-4 right-4 bg-gray-400 text-white rounded-lg text-lg px-4 py-2 flex items-center"
 
            >
                Add New
            </button>

            {/* Main Content */}
            <div className="flex flex-col items-center mt-16">
                {/* WebPage Title */}
                <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl font-medium rounded-lg px-5 py-2.5 text-center">
                    Models
                </h1>
            </div>
        </>
    );
}

export default AddModels;
