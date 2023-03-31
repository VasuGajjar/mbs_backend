const { oneOf, check, param, query, body, header } = require('express-validator');
const { GenderType } = require('../../common/const');

const validateAddPatient = [
    body('first_name').exists().notEmpty(),
    body('last_name').exists().notEmpty(),
    body('address').exists().notEmpty(),
    oneOf([
        body('email').exists().isEmail(),
        body('phone').exists().isMobilePhone(),
    ]),
    body('date_of_birth').exists().isISO8601('yyyy-mm-dd'),
    body('gender').exists().isIn(Object.values(GenderType)),
];

const validateGetPatient = [
    param('id').exists().notEmpty(),
];

module.exports = {
    validateAddPatient,
    validateGetPatient
}