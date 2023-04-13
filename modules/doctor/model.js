const { DatabaseTables } = require("../../common/const");
const pool = require("../../services/db");

async function getDoctor(id, select = '*') {
    let result = await pool.query(`SELECT ${select} FROM ${DatabaseTables.doctor} WHERE id='${id}'`);
    return result.rows.first;
}

module.exports = {
    getDoctor
};