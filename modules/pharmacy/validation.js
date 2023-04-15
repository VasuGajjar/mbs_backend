const { oneOf, check, param, query, body, header } = require('express-validator');

const validateAdd = [
    body('pharmacy_id').exists().isInt().toInt(),
    body('medicine_id').exists().isInt().toInt(),
];

const validateUpdate = [
    body('id').exists().isInt().toInt(),
    body('quantity').exists().isInt().toInt(),
    body('price').exists().isNumeric(),
];

const validateGetList = [
    query('pharmacy_id').exists().isInt().toInt(),
];

const validateCheck = [
    body('pharmacy_id').exists().isInt().toInt(),
    body('prescription_id').exists().isInt().toInt(),
];

module.exports = {
    validateAdd,
    validateUpdate,
    validateGetList,
    validateCheck,
};