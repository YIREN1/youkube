const express = require('express');

const router = express.Router();
const passport = require('passport');
const SubscribeController = require('../controllers/SubscribeController');

const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/subscribe', passportJWT, SubscribeController.subscribe);

router.post('/unsubscribe', passportJWT, SubscribeController.unSubscribe);

router.get(
  '/getSubscriberCount',
  passportJWT,
  SubscribeController.getSubscriberCount,
);

router.get('/isSubscribed', passportJWT, SubscribeController.isSubscribed);

module.exports = router;
