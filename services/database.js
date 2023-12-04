require('dotenv').config();
const mysql = require('mysql2');

// Create a pool of connections
const pool = mysql.createPool({
    connectionLimit: 10, // Maximum number of connections in pool
    host: "bookstore-mysql",
    port: '3306',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    queueLimit: 20
});

// Function to get a connection from the pool
function getConnection(callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection from pool', err);
            return callback(err, null);
        }
        callback(null, connection);
    });
}

// Function to release a connection back to the pool
function releaseConnection(connection) {
    if (connection) connection.release();
}

// Export getConnection and releaseConnection for use in your application
module.exports = {
    getConnection,
    releaseConnection
};