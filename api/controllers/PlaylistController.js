const Playlist = require('../models/Playlist');

const saveToPlaylist = async (req, res) => {
  try {
    const { videoId, playlistId } = req.query;
    const userId = req.user.id;
    const foundPlaylist = await Playlist.find({ userId, _id: playlistId });
    if (foundPlaylist.videoIds.includes(videoId)) {
      return res.status(200).json({ success: true });
    }
    foundPlaylist.videoIds.push(videoId);
    foundPlaylist.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, error });
  }
};

const removeFromPlaylist = async (req, res) => {
  try {
    const { videoId, playlistId } = req.query;
    const userId = req.user.id;
    const foundPlaylist = await Playlist.find({ userId, _id: playlistId });
    if (foundPlaylist.videoIds.includes(videoId)) {
      return res.status(200).json({ success: true });
    }
    foundPlaylist.videoIds.push(videoId);
    foundPlaylist.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, error });
  }
};
const createPlaylist = async (req, res) => {
  try {
    const playlist = new Playlist(req.body);
    playlist.userId = req.user.id;
    if (!playlist.videoIds) {
      playlist.videoIds = [];
    }
    const savedPlaylist = await playlist.save();
    return res.status(200).json({ success: true, savedPlaylist });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, error });
  }
};

const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user.id });
    return res.status(200).json({ success: true, playlists });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

module.exports = { saveToPlaylist, getPlaylists, createPlaylist };
