const { oneOf, check, param, query, body, header } = require('express-validator');
const { UserType } = require('../../common/const');

const validateSignin = [
    body('user_type').exists().bail().isIn(UserType),
    body('doctor.first_name').if((_, { req }) => req.body.user_type == UserType.doctor).exists(),
    body('doctor.last_name').if((_, { req }) => req.body.user_type == UserType.doctor).exists(),
    body('doctor.email').if((_, { req }) => req.body.user_type == UserType.doctor).exists().bail().isEmail(),
    body('doctor.phone').if((_, { req }) => req.body.user_type == UserType.doctor).exists().bail().isMobilePhone(),
    body('doctor.specialization').if((_, { req }) => req.body.user_type == UserType.doctor).exists(),
    body('doctor.license_no').if((_, { req }) => req.body.user_type == UserType.doctor).exists().bail().isLength({ min: 10, max: 10 }),
    body('pharmacy.name').if((_, { req }) => req.body.user_type == UserType.pharmacy).exists(),
    body('pharmacy.address').if((_, { req }) => req.body.user_type == UserType.pharmacy).exists(),
    body('pharmacy.email').if((_, { req }) => req.body.user_type == UserType.pharmacy).exists().bail().isEmail(),
    body('pharmacy.phone').if((_, { req }) => req.body.user_type == UserType.pharmacy).exists().bail().isMobilePhone(),
    body('pharmacy.license_no').if((_, { req }) => req.body.user_type == UserType.pharmacy).exists().bail().isLength({ min: 10, max: 10 }),
    body('credential.username').exists(),
    body('credential.password').exists().bail().isStrongPassword({ minLength: 6, minSymbols: 0 }),
];

const validateLogin = [
    body('user_type').exists().bail().isIn(UserType),
    body('username').exists().bail().trim().notEmpty(),
    body('password').exists().bail().trim().notEmpty()
];

module.exports = {
    validateSignin,
    validateLogin,
}