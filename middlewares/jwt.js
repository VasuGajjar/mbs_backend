const jwt = require("jsonwebtoken");

async function jwtValidator(req, res, next) {
    try {
        let token = req.headers?.['authorization']?.split(' ')?.[1];

        if (!token) throw { status_code: 403, message: 'Invalid token' };

        var payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload;
        next();
    } catch (error) {
        console.log('JWT.middleware.error: ', error);
        res.status(error.status_code ?? 403).json({
            status: false,
            message: error.message ?? 'Something went wrong',
        });
    }
}

module.exports = jwtValidator;