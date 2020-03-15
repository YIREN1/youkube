const express = require('express');

const router = express.Router();
const passport = require('passport');
const PlaylistController = require('../controllers/PlaylistController');

const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/createPlaylist', passportJWT, PlaylistController.createPlaylist);

router.post('/saveToPlaylist', passportJWT, PlaylistController.saveToPlaylist);

router.post(
  '/removeFromPlaylist',
  passportJWT,
  PlaylistController.removeFromPlaylist,
);

router.get('/getPlaylists', passportJWT, PlaylistController.getPlaylists);

module.exports = router;
