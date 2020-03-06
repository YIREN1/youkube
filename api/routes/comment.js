const express = require('express');

const router = express.Router();
const passport = require('passport');
const CommentController = require('../controllers/CommentController');

const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/saveComment', passportJWT, CommentController.saveComment);

router.get('/getComments', passportJWT, CommentController.getComments);
router.get(
  '/getReplyComments',
  passportJWT,
  CommentController.getReplyComments,
);

module.exports = router;
