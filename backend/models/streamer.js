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
        upvotes: {type: Number, default: 0, required: false},
        downvotes: {type: Number,  default: 0, required: false}
    },


})

module.exports = mongoose.model('Streamer', streamerSchema)