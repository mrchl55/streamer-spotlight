const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const HttpError = require('./models/http-error');
const streamersRoutes = require('./routes/streamers-routes')
const ACCESS_DATA = require("./util/access-variables");
const cors = require('cors')
const app = express();


app.use(cors())

app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' )
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT')
//     next();
// })

app.use('/', cors(), streamersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});
const uri = `mongodb+srv://${ACCESS_DATA.DB_USER}:${ACCESS_DATA.DB_PASSWORD}@cluster0.vourema.mongodb.net/${ACCESS_DATA.DB_NAME}?retryWrites=true&w=majority`;

mongoose
    .connect(uri)
    .then(() => {
        app.listen(5000);
    })
    .catch(err => console.log(err))
