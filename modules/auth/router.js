const { Router } = require("express");
const router = Router();

const validator = require('../../middlewares/validator');
const { validateSignin, validateLogin } = require('./validation');
const { userSignup, userLogin } = require('./controller');

router.post("/signin", validateSignin, validator, userSignup);
router.post("/login", validateLogin, validator, userLogin);

module.exports = router;