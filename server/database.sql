CREATE DATABASE ebaytrack_inventory;

\c ebaytrack_inventory

-- Table to store model inventory details
CREATE TABLE model_inventory (
    model_id SERIAL PRIMARY KEY,
    model_mold VARCHAR(255) NOT NULL,
    model_name VARCHAR(255) NOT NULL,
    model_image VARCHAR(255),
    model_color VARCHAR(255), 
    model_quantity INT DEFAULT 0
);

-- Table to store purchase data
CREATE TABLE purchase_data (
    purchase_id SERIAL PRIMARY KEY,
    model_id INT REFERENCES model_inventory(model_id) ON DELETE CASCADE,
    purchase_quantity INT,
    purchase_date DATE,
    purchase_price DECIMAL(10,2),
    purchase_shipping DECIMAL(10,2),
    purchase_fees DECIMAL(10,2),
    FOREIGN KEY (model_id) REFERENCES model_inventory(model_id) ON DELETE CASCADE
);

-- Table to store sale data
CREATE TABLE sale_data (
    sale_id SERIAL PRIMARY KEY,
    model_id INT REFERENCES model_inventory(model_id) ON DELETE CASCADE,
    sale_quantity INT,
    sale_date TIMESTAMP NOT NULL,
    sale_shipping DECIMAL(10,2),
    sale_fees DECIMAL(10,2),
    sale_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (model_id) REFERENCES model_inventory(model_id) ON DELETE CASCADE
);

-- Table to store transaction logs
CREATE TABLE transactions_logs (
    transaction_id SERIAL PRIMARY KEY,
    model_id INT REFERENCES model_inventory(model_id) ON DELETE CASCADE,
    transaction_type SMALLINT,
    transaction_date DATE,
    transaction_price DECIMAL(10,2),
    transaction_quantity INT NOT NULL,
    transaction_profit DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (model_id) REFERENCES model_inventory(model_id) ON DELETE CASCADE
);

-- Table to store tags
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(255) UNIQUE NOT NULL,
    bgColor VARCHAR(20) NOT NULL,
    textColor VARCHAR(20) NOT NULL,
    borderColor VARCHAR(20) NOT NULL
);

-- Table to associate models with tags (many-to-many relationship)
CREATE TABLE model_tags (
    model_id INT NOT NULL REFERENCES model_inventory(model_id) ON DELETE CASCADE,
    tag_id INT NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (model_id, tag_id)
);

-- Table for scraped data
CREATE TABLE scraped_idyb (
    scraped_idyb_id SERIAL PRIMARY KEY,
    scraped_idyb_mold VARCHAR(255),
    scraped_idyb_name VARCHAR(255),
    scraped_idyb_color VARCHAR(255),
    scraped_idyb_image VARCHAR(255)
);
