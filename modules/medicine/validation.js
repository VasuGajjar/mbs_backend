const { oneOf, check, param, query, body, header } = require('express-validator');

const validateAddMedicine = [
    body('name').exists().notEmpty(),
    body('description').exists().notEmpty(),
    body('type').exists().notEmpty(),
    body('manufacturer').exists().notEmpty(),
];

const validateGetMedicine = [
    param('id').exists().notEmpty()
];

const validateGetMedicines = [
    query('name').optional(),
    query('description').optional(),
    query('type').optional(),
    query('manufacturer').optional(),
];

module.exports = {
    validateAddMedicine,
    validateGetMedicine,
    validateGetMedicines,
}