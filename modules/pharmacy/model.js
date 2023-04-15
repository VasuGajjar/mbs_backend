const { DatabaseTables } = require("../../common/const");
const pool = require("../../services/db");

async function setQuantityPrice(pharmacy_id, medicine_id, quantity, price) {
    let result = await pool.query(`INSERT INTO ${DatabaseTables.pharmacyMedicine} (pharmacy_id, medicine_id, quantity, price) VALUES ('${pharmacy_id}', '${medicine_id}', '${quantity}', '${price}') RETURNING *`);
    return result.rows.first;
}

async function updateQuantityPrice(id, quantity = null, price = null) {
    let updateQuery = '';
    if (quantity) updateQuery += `, quantity='${quantity}'`
    if (price) updateQuery += `, price='${price}'`
    let result = await pool.query(`UPDATE ${DatabaseTables.pharmacyMedicine} SET updated_at=CURRENT_TIMESTAMP ${updateQuery} WHERE id='${id}' RETURNING *`);
    return result.rows.first;
}

async function getMedicineQuantityPrice(pharmacy_id, medicine_id = null) {
    let query = `SELECT pm.id, medicine_id, name, description, manufacturer, type, quantity, price FROM ${DatabaseTables.pharmacyMedicine} AS pm INNER JOIN ${DatabaseTables.medicine} AS m ON pm.medicine_id=m.id WHERE pharmacy_id='${pharmacy_id}'`;
    if (medicine_id) query += ` AND medicine_id='${medicine_id}';`;
    let result = await pool.query(query);
    return result.rows;
}

async function getTotalPrice(pharmacy_id, prescription_id) {
    let query = `SELECT pm.id, pm.quantity, pm.price, (pm.price*mt.quantity) AS total_price FROM ${DatabaseTables.pharmacyMedicine} as pm INNER JOIN ${DatabaseTables.medication} AS mt ON pm.medicine_id=mt.medicine_id WHERE mt.prescription_id='${prescription_id}' AND mt.quantity<pm.quantity AND pm.pharmacy_id='${pharmacy_id}'`;
    let result = await pool.query(query);
    return result.rows;
}

async function getGrandTotalPrice(pharmacy_id, prescription_id) {
    let query = `SELECT SUM(pm.price*mt.quantity) AS total_price FROM ${DatabaseTables.pharmacyMedicine} AS pm INNER JOIN ${DatabaseTables.medication} AS mt ON pm.medicine_id=mt.medicine_id WHERE mt.prescription_id='${prescription_id}' AND mt.quantity<pm.quantity AND pm.pharmacy_id='${pharmacy_id}'`;
    let result = await pool.query(query);
    return result.rows.first?.total_price;
}

module.exports = {
    setQuantityPrice,
    updateQuantityPrice,
    getMedicineQuantityPrice,
    getTotalPrice,
    getGrandTotalPrice,
};