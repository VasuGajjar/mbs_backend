const { DatabaseTables } = require("../common/const");
const pool = require("../services/db");

async function checkUsernameExist(userType, username) {
    let result = await pool.query(`SELECT * FROM ${DatabaseTables.loginUser} WHERE user_type='${userType}' AND username='${username}'`)
    return result.rowCount;
}

async function createDoctor({ first_name, last_name, email, phone, specialization, license_no }) {
    await pool.query(`INSERT INTO ${DatabaseTables.doctor} (first_name, last_name, email, phone, specialization, license_number) VALUES ('${first_name}', '${last_name}', '${email}', '${phone}', '${specialization}', '${license_no}')`);
    let result = await pool.query(`SELECT id FROM ${DatabaseTables.doctor} WHERE first_name='${first_name}' AND last_name='${last_name}' AND email='${email}' AND phone='${phone}' AND specialization='${specialization}' AND license_number='${license_no}'`);
    return result.rows[0].id;
}

async function createPharmacy({ name, address, email, phone, license_no }) {
    await pool.query(`INSERT INTO ${DatabaseTables.pharmacy} (name, address, email, phone, license_number) VALUES ('${name}', '${address}', '${email}', '${phone}', '${license_no}')`);
    let result = await pool.query(`SELECT id FROM ${DatabaseTables.pharmacy} WHERE first_name='${first_name}' AND last_name='${last_name}' AND email='${email}' AND phone='${phone}' AND specialization='${specialization}' AND license_number='${license_no}'`);
    return result.rows[0].id;
}

async function createCredential({ userType, userId, username, password }) {
    await pool.query(`INSERT INTO ${DatabaseTables.loginUser} (user_type, user_id, username, password, last_login) VALUES ('${userType}', '${userId}', '${username}', '${password}', CURRENT_TIMESTAMP)`);
    let result = await pool.query(`SELECT id, user_type, user_id, username, last_login FROM ${DatabaseTables.loginUser} WHERE user_type='${userType}' AND user_id='${userId}' AND username='${username}'`);
    return result.rows[0];
}

async function getUserPassword(userType, username) {
    let result = await pool.query(`SELECT password FROM ${DatabaseTables.loginUser} WHERE user_type='${userType}' AND username='${username}'`)
    return result.rows?.[0].password;
}

async function getUserByCredentials(userType, username) {
    await pool.query(`UPDATE ${DatabaseTables.loginUser} SET last_login=CURRENT_TIMESTAMP WHERE user_type='${userType}' AND username='${username}'`);
    let result = await pool.query(`SELECT id, user_type, user_id, username, last_login FROM ${DatabaseTables.loginUser} WHERE user_type='${userType}' AND username='${username}'`)
    return result.rows?.[0];
}

module.exports = {
    checkUsernameExist,
    createDoctor,
    createPharmacy,
    createCredential,
    getUserPassword,
    getUserByCredentials,
}