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

// get all model inventories

// get a model inventory

// update a model inventory

// delete/mark as sold model inventory

// to start server with express, we need port
// with confirmation it's started
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
