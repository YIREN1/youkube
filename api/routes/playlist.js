const express = require('express');

const router = express.Router();
const passport = require('passport');
const PlaylistController = require('../controllers/PlaylistController');

const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/savePlaylist', passportJWT, PlaylistController.savePlaylist);

router.get('/getPlaylists', passportJWT, PlaylistController.getPlaylists);

module.exports = router;
