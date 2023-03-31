const { Router } = require("express");
const router = Router();

const validator = require('../../middlewares/validator');
const { validateAddPatient, validateGetPatient } = require('./validation');
const { addPatient, getPatient } = require('./controller');

router.post("/", validateAddPatient, validator, addPatient);
router.get("/:id", validateGetPatient, validator, getPatient);

module.exports = router;