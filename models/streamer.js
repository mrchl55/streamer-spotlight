const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const streamerSchema = new Schema({
    name: {
        type: String, required: true,
    },
    platform: {
        type: String, required: true,
    },
    description: {type: String, required: true},
    image: {type: String, required: false},
    votes: {
        upvotes: {type: Number, required: true},
        downvotes: {type: Number, required: true}
    },


})

module.exports = mongoose.model('Streamer', streamerSchema)