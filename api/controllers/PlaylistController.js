const Playlist = require('../models/Playlist');

const savePlaylist = async (req, res) => {
  try {
    const playlist = new Playlist(req.body);
    playlist.userId = req.user.id;
    const savedPlaylist = await playlist.save();
    return res.status(200).json({ success: true, savedPlaylist });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const getPlaylists = async (req, res) => {
  try {
    const { userId } = req.query;
    const playlists = await Playlist.find({ userId });
    return res.status(200).json({ success: true, playlists });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

module.exports = { savePlaylist, getPlaylists };
