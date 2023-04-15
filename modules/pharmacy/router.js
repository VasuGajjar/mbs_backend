const { Router } = require('express');
const router = Router();

const validator = require('../../middlewares/validator');
const validation = require('./validation');
const controller = require('./controller');

router.post('/add-medicine', validation.validateAdd, validator, controller.addMedicineStock);
router.patch('/update-stock', validation.validateUpdate, validator, controller.updateMedicineStock);
router.get('/list-medicine', validation.validateGetList, validator, controller.getStockList);
router.post('/check-prescription', validation.validateCheck, validator, controller.checkPrescription);

module.exports = router;