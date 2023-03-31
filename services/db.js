const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

/**
 * This function provides helper functions for
 * postgres query parameter manipulation
 * @param {Array} params
 */
const paramBuilder = (params = []) => {
    let count = params.length;

    return {
        add: (value) => {
            params[count++] = value;
            return `$${count}`;
        },
        get: () => params,
    };
}

module.exports = pool;
module.exports.ParamBuilder = paramBuilder;