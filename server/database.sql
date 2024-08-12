-- create overall database to contain tables
CREATE DATABASE ebaytrack_inventory;

CREATE TABLE model_inventory (
    model_id SERIAL PRIMARY KEY,
    model_name VARCHAR(255)
);
