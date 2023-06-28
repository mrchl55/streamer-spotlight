const uuid = require('uuid/v4');
const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');
const Streamer = require('../models/streamer')
let DUMMY_STREAMERS = [
    {
        id: 's1',
        name: 'Streamer 1',
        platform: 'YouTube',
        description: 'One of the most famous streamers in the world!',
        image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png',
        votes: {
            upvotes: 2,
            downvotes: 5,
        }

    }
];
const getAllStreamers = async (req, res, next) => {
    let streamer;
    try{
        streamer = await Streamer.find();
    }catch(err){

        const error = new HttpError('Something went wrong, could not find streamers', 500)
        return next(error)
    }
    if (!streamer) {
        const error =  new HttpError('Sorry! No streamers to display!', 404);
        return next(error)
    }

    res.json({streamer});
};
const getStreamerById = (req, res, next) => {
    const streamerId = req.params.sid;

    const streamer = DUMMY_STREAMERS.find(p => {
        return p.id === streamerId;
    });

    if (!streamer) {
        throw new HttpError('Could not find a streamer for the provided id.', 404);
    }

    res.json({streamer});
};



const getStreamersByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const streamers = DUMMY_STREAMERS.filter(p => {
        return p.creator === userId;
    });

    if (!streamers || streamers.length === 0) {
        return next(
            new HttpError('Could not find streamers for the provided user id.', 404)
        );
    }

    res.json({streamers});
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
        const error = new HttpError('Creating streamer failed', 500)
        return next(error)
    }
    DUMMY_STREAMERS.push(createdStreamer);

    res.status(201).json({streamer: createdStreamer});
};


exports.getAllStreamers = getAllStreamers;
exports.getStreamerById = getStreamerById;
exports.getStreamersByUserId = getStreamersByUserId;
exports.createStreamer = createStreamer;

