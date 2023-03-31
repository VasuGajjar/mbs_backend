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
    body('name').optional(),
    body('description').optional(),
    body('type').optional(),
    body('manufacturer').optional(),
];

module.exports = {
    validateAddMedicine,
    validateGetMedicine,
    validateGetMedicines,
}