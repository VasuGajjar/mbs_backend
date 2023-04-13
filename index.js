require('dotenv').config();
require('./common/extensions');

const express = require("express");
const jwtValidator = require('./middlewares/jwt');

const app = express();

app.use(express.json());
app.use("/api/auth", require("./modules/auth/router"));
app.use('/api/medicine', jwtValidator, require("./modules/medicine/router"));
app.use('/api/patient', jwtValidator, require("./modules/patient/router"));
app.use('/api/prescription', jwtValidator, require("./modules/prescription/router"));

app.listen(
    process.env.SERVER_PORT,
    () => console.log("Server running on port", process.env.SERVER_PORT),
);