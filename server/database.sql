-- Create the database
CREATE DATABASE ebaytrack_inventory;

\c ebaytrack_inventory

-- Table to store model inventory details
CREATE TABLE model_inventory (
    model_id SERIAL PRIMARY KEY,
    model_name VARCHAR(255) NOT NULL,
    model_image TEXT,
    quantity INT DEFAULT 0
);

-- Table to store purchase data
CREATE TABLE purchase_data (
    purchase_id SERIAL PRIMARY KEY,
    model_id INT REFERENCES model_inventory(model_id) ON DELETE CASCADE,
    purchase_date DATE,
    purchase_price DECIMAL(10,2),
    quantity INT NOT NULL,
    FOREIGN KEY (model_id) REFERENCES model_inventory(model_id) ON DELETE CASCADE
);

-- Table to store sale data
CREATE TABLE sale_data (
    sale_id SERIAL PRIMARY KEY,
    model_id INT REFERENCES model_inventory(model_id) ON DELETE CASCADE,
    sale_date TIMESTAMP NOT NULL,
    sale_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (model_id) REFERENCES model_inventory(model_id) ON DELETE CASCADE
);

-- Table to store transaction logs
CREATE TABLE transactions_logs (
    transaction_id SERIAL PRIMARY KEY,
    model_id INT REFERENCES model_inventory(model_id) ON DELETE CASCADE,
    transaction_type SMALLINT,
    transaction_date DATE,
    transaction_price DECIMAL(10,2),
    quantity INT NOT NULL,
    profit DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (model_id) REFERENCES model_inventory(model_id) ON DELETE CASCADE
);

-- Table to store tags
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(255) UNIQUE
);

-- Table to associate models with tags (many-to-many relationship)
CREATE TABLE model_tags (
    model_id INT NOT NULL REFERENCES model_inventory(model_id) ON DELETE CASCADE,
    tag_id INT NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (model_id, tag_id)
);
