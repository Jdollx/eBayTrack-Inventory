// require the libraries needed
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// assign app variable to run express
const app = express();

// Set up static file serving
app.use('/images', express.static(path.join(__dirname, 'images')));

// set up storage for image upload via add model
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // tells where to store
        const uploadDir = path.join(__dirname, 'images');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // filename regulation
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage });

// create middleware 
app.use(cors());
// allows server to parse JSON data in the request bodies
app.use(express.json());

// -- ROUTES (CRUD) -- 

app.post("/models", upload.single('model_image'), async (req, res) => {
    try {
        const { model_name, model_color, model_quantity, purchase_date, purchase_price, sale_date, sale_price, tags } = req.body;
        const model_image = req.file ? `/images/${req.file.filename}` : null;

        // Check if model already exists
        const existingModel = await pool.query(
            "SELECT * FROM model_inventory WHERE model_name = $1",
            [model_name]
        );

        if (existingModel.rows.length > 0) {
            return res.status(409).json({ error: "Model with this name already exists" });
        }

        // Insert new model
        const newModel = await pool.query(
            "INSERT INTO model_inventory (model_name, model_image, model_color, model_quantity) VALUES ($1, $2, $3, $4) RETURNING *", 
            [model_name, model_image, model_color, model_quantity]
        );

        const modelId = newModel.rows[0].model_id;

        // Insert purchase data if provided
        if (purchase_date) {
            await pool.query(
                "INSERT INTO purchase_data (model_id, purchase_date, purchase_price) VALUES ($1, $2, $3)", 
                [modelId, purchase_date, purchase_price]
            );
        }

        // Insert sale data if provided
        if (sale_date) {
            await pool.query(
                "INSERT INTO sale_data (model_id, sale_date, sale_price) VALUES ($1, $2, $3)", 
                [modelId, sale_date, sale_price]
            );
        }

        // Insert tags if provided
// Insert tags if provided
        if (tags) {
            const tagArray = JSON.parse(tags);

            // Collect tag associations to insert
            const tagAssociations = tagArray.map(async (tag_id) => {
                try {
                    // Check if the tag is already associated with the model
                    const existingAssociation = await pool.query(
                        "SELECT * FROM model_tags WHERE model_id = $1 AND tag_id = $2",
                        [modelId, tag_id]
                    );

                    if (existingAssociation.rows.length === 0) {
                        // Insert new association if it doesn't exist
                        await pool.query(
                            "INSERT INTO model_tags (model_id, tag_id) VALUES ($1, $2) RETURNING *",
                            [modelId, tag_id]
                        );
                        console.log('Tag associated:', tag_id);
                    } else {
                        console.log(`Tag ${tag_id} already associated with model ${modelId}`);
                    }
                } catch (error) {
                    console.error('Error associating tag:', error.message);
                    throw error; // Re-throw to ensure Promise.all rejects
                }
            });

            await Promise.all(tagAssociations);
        }


        res.status(201).json(newModel.rows[0]);
    } catch (error) {
        console.error('Error inserting model:', error.message);
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
});




// get all model inventories
app.get("/models", async (req, res) => {
    try {
        const allModels = await pool.query(
            `SELECT 
                mi.model_id, 
                mi.model_name, 
                mi.model_image, 
                mi.model_color, 
                mi.model_quantity,
                pd.purchase_date, 
                pd.purchase_price,
                sd.sale_date,
                sd.sale_price,
                t.tag_id,
                t.tag_name
            FROM model_inventory mi
            LEFT JOIN purchase_data pd ON mi.model_id = pd.model_id
            LEFT JOIN sale_data sd ON mi.model_id = sd.model_id
            LEFT JOIN model_tags mt ON mi.model_id = mt.model_id
            LEFT JOIN tags t ON mt.tag_id = t.tag_id;
            `
        );
        res.json(allModels.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
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
        const{model_name, model_image, model_quantity} = req.body;
        const updateModel = await pool.query(
            "UPDATE model_inventory SET model_name = $1, model_image = $2, model_quantity = $3 WHERE model_id = $4 RETURNING *",
            [model_name, model_image, model_quantity, id]
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

app.post('/purchases', async (req, res) => {
    console.log('Request body:', req.body);
    try {
        let { model_id, purchase_date, purchase_price } = req.body;

        if (!model_id || !purchase_date || !purchase_price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Here, purchase_date should already be in the correct format (yyyy-mm-dd)
        const result = await pool.query(
            'INSERT INTO purchase_data (model_id, purchase_date, purchase_price) VALUES ($1, $2, $3) RETURNING *',
            [model_id, purchase_date, purchase_price]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting purchase:', error);
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
});

// get a specific model inventory
app.get("/purchases", async (req, res) => {
    try {
        const allPurchases = await pool.query("SELECT * FROM purchase_data"); // Fixed table name
        res.json(allPurchases.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// create sale data
app.post("/sales", async(req,res) => {
    try {
        // get sale data from client side via express.json
        const { model_id, sale_date, sale_price } = req.body;
        // insert new sale data into the database
        const newSale = await pool.query(
            "INSERT INTO sale_data (model_id, sale_date, sale_price) VALUES ($1, $2, $3) RETURNING *", 
            [model_id, sale_date, sale_price]
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
        // get tansaction log from client side via express.json
        const { model_id, transaction_type, transaction_date, transaction_price, transaction_quantity, profit } = req.body;
        // insert new transaction log into the database
        const newTransaction = await pool.query(
            "INSERT INTO transactions_logs (model_id, transaction_type, transaction_date, transaction_price, transaction_quantity, profit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [model_id, transaction_type, transaction_date, transaction_price, transaction_quantity, profit]
        );
        // return the row of the most recently inserted
        res.json(newTransaction.rows[0]);

    } catch (error) {
        console.error(error.message);
        
    }
});

// create tags (no model association)
app.post("/tags", async (req, res) => {
    try {
        const { tag_name, bgColor, textColor, borderColor } = req.body;
        console.log("Received tag_name:", tag_name);

        const newTags = await pool.query(
            "INSERT INTO tags (tag_name, bgColor, textColor, borderColor) VALUES ($1, $2, $3, $4) RETURNING *",
            [tag_name, bgColor, textColor, borderColor]
        );

        console.log("Inserted tag:", newTags.rows[0]);
        res.json(newTags.rows[0]);
    } catch (error) {
        console.error("Error inserting tag:", error.message);
        res.status(500).json({ error: 'An error occurred while creating the tag' });
    }
});

// list the tags
app.get("/tags", async(req,res) => {
    try {
        const allTags = await pool.query("SELECT * FROM tags"); 
        res.json(allTags.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});


// used to delete tag in modal
app.delete("/tags/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTags = await pool.query("DELETE FROM tags WHERE tag_id = $1 RETURNING *",
        [id]); 
        res.json(deleteTags.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// display tags associated with a specific model
app.get("/models/:id/tags", async (req, res) => {
    try {
        const { id } = req.params; // model_id
        
        // Query to get tags associated with the model
        const result = await pool.query(
            `SELECT t.tag_id, t.tag_name
             FROM model_tags mt
             JOIN tags t ON mt.tag_id = t.tag_id
             WHERE mt.model_id = $1`,
            [id]
        );
        
        // Return the tags associated with the model
        res.status(200).json(result.rows);
    } catch (error) {
        // Log and respond with error message
        console.error('Error retrieving tags for model:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// associate tags with models
app.post('/model_tags', (req, res) => {
    const { model_id, tag_id } = req.body;

    const query = `INSERT INTO model_tags (model_id, tag_id) VALUES ($1, $2)`;

    pool.query(query, [model_id, tag_id], (error, results) => {
        if (error) {
            res.status(400).send(error.message);
        } else {
            res.status(201).send('Tag associated with model successfully');
        }
    });
});




// to start server with express, we need port
// with confirmation it's started
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
