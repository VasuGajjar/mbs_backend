require('dotenv').config();
const express = require("express");
const jwtValidator = require('./middlewares/jwt');

const app = express();

app.use(express.json());
app.use("/api", require("./routes/auth"));
app.get("/test", jwtValidator, function (req, res) {
    res.status(200).json({ status: true, message: 'hellow', user: req.user });
})

app.listen(
    process.env.SERVER_PORT,
    () => console.log("Server running on port", process.env.SERVER_PORT),
);