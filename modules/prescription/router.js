const { Router } = require("express");
const router = Router();

const validator = require('../../middlewares/validator');
const validation = require('./validation');
const controller = require('./controller');

router.post("/", validation.validateAddPrescription, validator, controller.addPrescription);
router.get("/:id", validation.validateGetPrescription, validator, controller.getPrescription);
router.get("/", validation.validateGetPrescriptions, validator, controller.getPrescriptions);

router.post("/:prescription_id/medication", validation.validateAddMedication, validator, controller.addMedication);
router.get("/:prescription_id/medication/:medicine_id", validation.validateGetMedication, validator, controller.getMedication);

module.exports = router;