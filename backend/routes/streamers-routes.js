const express = require('express');
const {check} = require('express-validator');

const streamersControllers = require('../controllers/streamers-controllers');

const router = express.Router();

router.get('/streamer/:sid', streamersControllers.getStreamerById);
router.get('/streamers', streamersControllers.getAllStreamers);

router.post(
    '/streamers',
    [
        check('name')
            .not()
            .isEmpty(),
        check('description').isLength({min: 5}),

    ],
    streamersControllers.createStreamer
);
router.put(
    '/streamers/:sid/vote', streamersControllers.updateStreamer
);
module.exports = router;
