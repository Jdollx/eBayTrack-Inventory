// require the libraries needed
const express = require("express");
// assign app variable to run express
const app = express();

// to start server with express, we need port
// with confirmation it's started
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
