const { DatabaseTables } = require("../../common/const");
const pool = require("../../services/db");

async function addMedicine({ name, description, type, manufacturer }) {
    let result = await pool.query(`INSERT INTO ${DatabaseTables.medicine} (name, description, type, manufacturer) VALUES ('${name}', '${description}', '${type}', '${manufacturer}') RETURNING *`);
    return result.rows.first;
}

async function getMedicine(id) {
    let result = await pool.query(`SELECT * FROM ${DatabaseTables.medicine} WHERE id='${id}'`);
    return result.rows?.first;
}

async function getMedicines({ name = undefined, description = undefined, type = undefined, manufacturer = undefined }) {
    let query = `SELECT * FROM ${DatabaseTables.medicine} WHERE 1=1`;
    if(name) query += ` AND name LIKE '%${name}%'`;
    if(description) query += ` AND description LIKE '%${description}%'`;
    if(type) query += ` AND type='${type}'`;
    if(manufacturer) query += ` AND manufacturer='${manufacturer}'`;
    let result = await pool.query(query);
    return result.rows;
}

module.exports = {
    addMedicine,
    getMedicine,
    getMedicines
};