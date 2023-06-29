const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const HttpError = require('./models/http-error');
const streamersRoutes = require('./routes/streamers-routes')
const app = express();

app.use(bodyParser.json());

app.use('/', streamersRoutes);

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
const uri = "mongodb+srv://przemo:test@cluster0.vourema.mongodb.net/streamers?retryWrites=true&w=majority";

mongoose
    .connect(uri)
    .then(() => {
        app.listen(5000);
    })
    .catch(err => console.log(err))
