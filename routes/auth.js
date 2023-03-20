const { Router } = require("express");
const router = Router();

const { validateSignin, validateLogin } = require('../validators/auth');
const validator = require('../middlewares/validator');
const { userSignup, userLogin } = require('../controllers/auth');

router.post("/signin", validateSignin, validator, userSignup);
router.post("/login", validateLogin, validator, userLogin);

module.exports = router;