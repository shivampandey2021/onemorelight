const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const RegisterRoutes = require('./register-routes')

const app = express();
const port = process.env.PORT || 1234;

const apiRoutes = express.Router();

// setup the fruit routes
RegisterRoutes.setup(apiRoutes);

app.use(bodyParser.json());

// all REST api calls should be under api
app.use("/api", apiRoutes);


// 
app.use("/", express.static(path.join(__dirname, 'assets')));


app.listen(port, (req, res) => {
    console.log(
        `One More Light server started from nodemon and listening at http://localhost:${port}`
    );
});

// 404 Error
app.use(function (req, res, next) {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});


// Custom Error handler
app.use(function (err, req, res, next) {
    // TODO-5: handle common errors
    res.status(err.status || 500).send({
        err: {
            status: err.status || 500,
            message: err.message || 'Internal Server Error',
        },
    });
});
