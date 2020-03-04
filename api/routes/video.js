const express = require('express');

const router = express.Router();
const passport = require('passport');
const VideoController = require('../controllers/VideoController');

const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/upload', passportJWT, VideoController.uploadVideo);

router.post('/thumbnail', passportJWT, VideoController.getThumbnail);

router.post('/submitVideo', passportJWT, VideoController.submitVideo);

module.exports = router;
