const { DatabaseTables } = require("../../common/const");
const pool = require("../../services/db");

async function addPatient({ first_name, last_name, address, email, phone, date_of_birth, gender }) {
    let result = await pool.query(`INSERT INTO ${DatabaseTables.patient} (first_name, last_name, address, email, phone, date_of_birth, gender) VALUES ('${first_name}', '${last_name}', '${address}', '${email}', '${phone}', '${date_of_birth}', '${gender}') RETURNING *`);
    return result.rows.first;
}

async function getPatient(id, select = '*') {
    let result = await pool.query(`SELECT ${select} FROM ${DatabaseTables.patient} WHERE id='${id}'`);
    return result.rows.first;
}

module.exports = {
    addPatient,
    getPatient
};