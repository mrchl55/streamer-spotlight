const uuid = require('uuid/v4');
const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');
const Streamer = require('../models/streamer')
const getAllStreamers = async (req, res, next) => {
    let streamers;
    try {
        streamers = await Streamer.find();
    } catch (err) {

        const error = new HttpError('Something went wrong, could not find streamers', 500)
        return next(error)
    }
    if (!streamers?.length) {
        const error = new HttpError('Sorry! No streamers to display!', 404);
        return next(error)
    }

    res.json({streamers: streamers.map(streamer => streamer.toObject({getters: true}))});
};
const getStreamerById = async (req, res, next) => {
    const streamerId = req.params.sid;
    let streamer;
    try {
        streamer = await Streamer.findById(streamerId);

    } catch (err) {
        const error = new HttpError('Could not find a streamer for the provided id.', 404);
        return next(error)
    }

    res.json({streamer: streamer.toObject({getters: true})});
};


const createStreamer = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const {name, votes, description, platform} = req.body;
    const createdStreamer = new Streamer({
        name,
        description,
        votes,
        image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png',
        platform,

    })
    try {
        await createdStreamer.save()
    } catch (err) {
        console.log(err.message)
        const error = new HttpError('Creating streamer failed', 500)
        return next(error)
    }

    res.status(201).json({streamer: createdStreamer});
};
const updateStreamer = async (req, res, next) => {

    const {votes} = req.body;
    const streamerId = req.params.sid;

    let updatedStreamer;
    try {
        updatedStreamer = await Streamer.updateOne({_id: streamerId}, {
            votes
        })
    } catch (err) {
        console.log(err.message)
        const error = new HttpError('Updating streamer failed', 500)
        return next(error)
    }
    if (!updatedStreamer.matchedCount) {
        const error = new HttpError('Sorry! Couldnt find streamer!', 404);
        return next(error)
    }
    res.status(201).json({streamer: updatedStreamer});
};


exports.getAllStreamers = getAllStreamers;
exports.getStreamerById = getStreamerById;
exports.createStreamer = createStreamer;
exports.updateStreamer = updateStreamer;

