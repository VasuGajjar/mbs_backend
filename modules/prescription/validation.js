const { oneOf, check, param, query, body, header } = require('express-validator');

const validateAddPrescription = [
    body('prescription.doctor_id').exists().notEmpty(),
    body('prescription.patient_id').exists().notEmpty(),
    body('prescription.description').exists().notEmpty(),
    body('medications.*.medicine_id').exists().notEmpty(),
    body('medications.*.prescription_id').exists().notEmpty(),
    body('medications.*.dosage').exists().notEmpty(),
    body('medications.*.quantity').exists().notEmpty(),
    body('medications.*.start_date').exists().isISO8601('yyyy-mm-dd'),
    body('medications.*.end_date').exists().isISO8601('yyyy-mm-dd'),
    body('medications.*.refill_information').exists().notEmpty(),
];

const validateGetPrescription = [
    param('id').exists().notEmpty(),
];

const validateGetPrescriptions = [
    query('doctor_id').optional().isInt(),
    query('patient_id').optional().isInt(),
    query('description').optional().isString(),
];

const validateAddMedication = [
    param('prescription_id').exists().notEmpty(),
    body('medicine_id').exists().notEmpty(),
    body('dosage').exists().notEmpty(),
    body('quantity').exists().notEmpty(),
    body('start_date').exists().isISO8601('yyyy-mm-dd'),
    body('end_date').exists().isISO8601('yyyy-mm-dd'),
    body('refill_information').exists().notEmpty(),
];

const validateGetMedication = [
    param('prescription_id').exists().notEmpty(),
    param('medicine_id').exists().notEmpty(),
];

module.exports = {
    validateAddPrescription,
    validateGetPrescription,
    validateGetPrescriptions,
    validateAddMedication,
    validateGetMedication
}