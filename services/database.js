require('dotenv').config();
const mysql = require('mysql2');

function createDbConnection() {
    return mysql.createConnection({
        host: "mysql",
        port: '3306',
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.DB_NAME,
    });
}

function connectWithRetry(config, attempts) {
    config.connect(function(err) {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            if (attempts > 0) {
                console.log(`Retrying in 5 seconds (${attempts} attempts left)...`);
                setTimeout(() => {
                    // Create a new connection for each retry
                    const newConfig = createDbConnection();
                    connectWithRetry(newConfig, attempts - 1);
                }, 5000);
            }
        } else {
            console.log("Connected to database!");
        }
    });
}

const config = createDbConnection();
connectWithRetry(config, 10);  // Retry up to 10 times

module.exports = {
    config,
};