// require the libraries needed
const express = require("express");
const cors = require("cors");
const pool = require("./db");
// assign app variable to run express
const app = express();

// create middleware 
app.use(cors());
// allows server to parse JSON data in the request bodies
app.use(express.json());

// -- ROUTES (CRUD) -- 

// create model inventory
app.post("/models", async(req,res) => {
    try {
        // get model name data from client side via express.json
        const { model_name, model_image, quantity } = req.body;
        // insert new model name into the database
        const newModel = await pool.query(
            "INSERT INTO model_inventory (model_name, model_image, quantity) VALUES ($1, $2, $3) RETURNING *", 
            [model_name, model_image, quantity]
        );
        // return the row of the most recently inserted
        res.json(newModel.rows[0]);

    } catch (error) {
        console.error(error.message);
        
    }
});

// get all model inventories
app.get("/models", async(req,res) => {
    try {
        const allModels = await pool.query(
            "SELECT * FROM model_inventory"
        );
        res.json(allModels.rows);
    } catch (error) {
        console.error(error.message);
        
    }
});

// get a specific model inventory
app.get("/models/:id", async(req,res) => {
    try {
        // takes the inputted search and queries it
        const{id} = req.params;
        const oneModel = await pool.query(
            "SELECT * FROM model_inventory WHERE model_id = $1", 
            [id]
        );
        res.json(oneModel.rows[0]);
    } catch (error) {
        console.error(error.message);
        
    }
});

// update a model inventory
app.put("/models/:id", async(req,res) => {
    try {
        const{id} = req.params;
        const{model_name, model_image, quantity} = req.body;
        const updateModel = await pool.query(
            "UPDATE model_inventory SET model_name = $1, model_image = $2, quantity = $3 WHERE model_id = $4 RETURNING *",
            [model_name, model_image, quantity, id]
        );
        res.json({ message: "Model was updated." });
    } catch (error) {
        console.error(error.message);
    }
});

// delete/mark as sold model inventory
app.delete("/models/:id", async(req,res) => {
    try {
        // specify what you want to delete via input
        const{id} = req.params;
        const deleteModel = await pool.query(
            "DELETE FROM model_inventory WHERE model_id = $1",
            [id]
        );
        res.json({ message: "Model was deleted."})
    } catch (error) {
        console.error(error.message);
    }
});

// create purchase data
app.post("/purchases", async(req,res) => {
    try {
        // get purchase data from client side via express.json
        const { model_id, purchase_date, purchase_price, quantity } = req.body;
        // insert new purchase data into the database
        const newPurchase = await pool.query(
            "INSERT INTO purchase_data (model_id, purchase_date, purchase_price, quantity) VALUES ($1, $2, $3, $4) RETURNING *", 
            [model_id, purchase_date, purchase_price, quantity]
        );
        // return the row of the most recently inserted
        res.json(newPurchase.rows[0]);

    } catch (error) {
        console.error(error.message);
        
    }
});

// create sale data
app.post("/sales", async(req,res) => {
    try {
        // get purchase data from client side via express.json
        const { model_id, sale_date, sale_price, quantity } = req.body;
        // insert new purchase data into the database
        const newSale = await pool.query(
            "INSERT INTO sale_data (model_id, sale_date, sale_price, quantity) VALUES ($1, $2, $3, $4) RETURNING *", 
            [model_id, sale_date, sale_price, quantity]
        );
        // return the row of the most recently inserted
        res.json(newSale.rows[0]);

    } catch (error) {
        console.error(error.message);
        
    }
});

// create transaction log
app.post("/transactions", async(req,res) => {
    try {
        // get purchase data from client side via express.json
        const { model_id, transaction_type, transaction_date, transaction_price, quantity, profit } = req.body;
        // insert new purchase data into the database
        const newTransaction = await pool.query(
            "INSERT INTO transactions_logs (model_id, transaction_type, transaction_date, transaction_price, quantity, profit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [model_id, transaction_type, transaction_date, transaction_price, quantity, profit]
        );
        // return the row of the most recently inserted
        res.json(newTransaction.rows[0]);

    } catch (error) {
        console.error(error.message);
        
    }
});



// to start server with express, we need port
// with confirmation it's started
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
