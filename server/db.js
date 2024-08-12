require('dotenv').config();

// import Pool class from node-postgres to manage database connections
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: process.env.DB_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "ebaytrack_inventory"
});

module.exports = pool;