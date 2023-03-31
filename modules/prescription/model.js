const { DatabaseTables } = require("../../common/const");
const pool = require("../../services/db");

async function addPrescription({ doctor_id, patient_id, description }) {
    let result = await pool.query(`INSERT INTO ${DatabaseTables.prescription} (doctor_id, patient_id, description) VALUES ('${doctor_id}', '${patient_id}', '${description}') RETURNING *`);
    return result.rows.first;
}

async function getPrescription(id) {
    let result = await pool.query(`SELECT * FROM ${DatabaseTables.prescription} WHERE id='${id}'`);
    return result.rows.first;
}

async function getPrescriptions({ doctor_id = undefined, description = undefined, patient_id = undefined }) {
    let query = `SELECT * FROM ${DatabaseTables.prescription} WHERE 1=1`;
    if (doctor_id) query += ` AND doctor_id='%${doctor_id}%'`;
    if (patient_id) query += ` AND patient_id='${patient_id}'`;
    if (description) query += ` AND description LIKE '%${description}%'`;
    let result = await pool.query(query);
    return result.rows;
}

async function addMedication(prescription_id, { medicine_id, dosage, quantity, start_date, end_date, refill_information }) {
    let result = await pool.query(`INSERT INTO ${DatabaseTables.medication} (medicine_id, prescription_id, dosage, quantity, start_date, end_date, refill_information) VALUES ('${medicine_id}', '${prescription_id}', '${dosage}', '${quantity}', '${start_date}', '${end_date}', '${refill_information}') RETURNING *`);
    return result.rows.first;
}

async function getMedication(prescription_id, medicine_id) {
    let result = await pool.query(`SELECT * FROM ${DatabaseTables.medication} WHERE prescription_id='${prescription_id}' AND medicine_id='${medicine_id}'`);
    return result.rows.first;
}

module.exports = {
    addPrescription,
    getPrescription,
    getPrescriptions,
    addMedication,
    getMedication
};