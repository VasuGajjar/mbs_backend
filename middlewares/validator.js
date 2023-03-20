const { validationResult } = require('express-validator');

function validator(req, res, next) {
    let result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: 'Invalid input',
            error: result.array()
        });
    }

    next();
}

module.exports = validator;