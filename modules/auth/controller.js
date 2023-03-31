const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AuthModel = require('./model');
const { UserType } = require("../../common/const");

async function userSignup(req, res) {
    try {
        let { user_type, doctor, pharmacy, credential } = req.body;
        console.log(pharmacy)

        // Check if username already exists or not
        let userCount = await AuthModel.checkUsernameExist(user_type, credential.username);
        if (userCount > 0) throw { status_code: 400, message: 'Username already exist' };

        // Create new doctor/pharmacy
        let userId;
        if (user_type == UserType.doctor) userId = await AuthModel.createDoctor(doctor);
        if (user_type == UserType.pharmacy) userId = await AuthModel.createPharmacy(pharmacy);
        if (!userId) throw { status_code: 403, message: 'Could not create user' };

        // Store username and hashed password
        credential.password = await bcrypt.hash(credential.password, await bcrypt.genSalt(10));
        let user = await AuthModel.createCredential({
            userType: user_type,
            userId,
            ...credential,
        });

        // Generate JWT token
        let token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({
            status: true,
            user: user,
            token,
        });
    } catch (error) {
        console.log('AuthController.userSignup.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

async function userLogin(req, res) {
    try {
        let { user_type, username, password } = req.body;

        // Check if the user exists
        let userCount = await AuthModel.checkUsernameExist(user_type, username);
        if (userCount != 1) throw { status_code: 401, message: 'Invalid username or password' };

        // Check if the password is correct
        let userPassword = await AuthModel.getUserPassword(user_type, username);
        let passwordMatch = await bcrypt.compare(password, userPassword);
        if (!passwordMatch) throw { status_code: 401, message: 'Invalid username or password' };

        // Generate JWT token
        let user = await AuthModel.getUserByCredentials(user_type, username);
        let token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({
            status: true,
            user: user,
            token: token,
        });
    } catch (error) {
        console.log('AuthController.userLogin.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong',
        });
    }
}


module.exports = {
    userSignup,
    userLogin,
}