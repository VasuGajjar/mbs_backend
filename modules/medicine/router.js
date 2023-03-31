const { Router } = require("express");
const router = Router();

const validator = require('../../middlewares/validator');
const { validateAddMedicine, validateGetMedicine, validateGetMedicines } = require('./validation');
const { addMedicine, getMedicine, getMedicines } = require('./controller');

router.post("/", validateAddMedicine, validator, addMedicine);
router.get("/:id", validateGetMedicine, validator, getMedicine);
router.get("/", validateGetMedicines, validator, getMedicines);

module.exports = router;