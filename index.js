const { Pool } = require('pg');
require('dotenv/config'); // Load environment variables

console.log(process.env.dbName); // Check your environment variable

const pool = new Pool({
    connectionString: process.env.DATABASE_URL ,
    ssl: { rejectUnauthorized: false }
});

async function createTable() {
    try {
        const res1 = await pool.query(`
            CREATE TABLE IF NOT EXISTS codes (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                stdinput TEXT NOT NULL, 
                sourcecode TEXT NOT NULL,
                language VARCHAR(255) NOT NULL,
                created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                stdoutput TEXT NOT NULL,
                status VARCHAR(255) NOT NULL
            );
        `);
        console.log("Table created or already exists:", res1.command);
    } catch (err) {
        console.error("Error creating table:", err);
    }
}

async function getAllCodes() {
    try {
        const res2 = await pool.query(`SELECT * FROM codes`);
        return res2.rows; // Correctly returning rows
    } catch (err) {
        console.error("Error fetching all codes:", err);
    }
}

async function insertNewCode(username, srcCode, stdinp, lang, stdout, status) {
    try {
        const res = await pool.query(
            `INSERT INTO codes (username, sourcecode, stdinput, language, stdoutput, status) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
            [username, srcCode, stdinp, lang, stdout, status]
        );
        return res.rows[0]; // Return the inserted row
    } catch (err) {
        console.error("Error inserting new code:", err);
        throw err; // Return error to caller
    }
}

async function getCodeById(k) {
    try {
        const res1 = await pool.query(`SELECT * FROM codes WHERE id = $1`, [k]);
        return res1.rows[0]; // Return the specific row
    } catch (err) {
        console.error("Error fetching code by ID:", err);
    }
}

// Ensure the table is created
createTable();

// Export functions
module.exports = {
    getAllCodes,
    insertNewCode,
    getCodeById
};
