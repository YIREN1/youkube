const express = require('express');

const router = express.Router();
const passport = require('passport');
const LikeController = require('../controllers/LikeController');

const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/like', passportJWT, LikeController.like);

router.post('/removeLike', passportJWT, LikeController.removeLike);

router.get('/getLikesCount', passportJWT, LikeController.getLikesCount);

router.get('/isLiked', passportJWT, LikeController.isLiked);

// router.post('/dislike', passportJWT, LikeController.dislike);

// router.post('/removeDislike', passportJWT, LikeController.removeDislike);

// router.get('/getDislikes', passportJWT, LikeController.getDislikes);

module.exports = router;
