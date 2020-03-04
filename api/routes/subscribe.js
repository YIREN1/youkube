const express = require('express');

const router = express.Router();
const passport = require('passport');
const SubscribeController = require('../controllers/SubscribeController');

const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/subscribe', passportJWT, SubscribeController.uploadVideo);

router.post('/unsubscribe', passportJWT, SubscribeController.getThumbnail);

router.post('/submitVideo', passportJWT, SubscribeController.submitVideo);

router.get('/getVideos', passportJWT, SubscribeController.getVideos);

router.get('/getVideo/:videoId', SubscribeController.getVideo);

module.exports = router;
