const Playlist = require('../models/Playlist');

const saveToPlaylist = async (req, res) => {
  try {
    const { videoId, playlistId } = req.body;
    const userId = req.user.id;
    const foundPlaylist = await Playlist.findOne({ _id: playlistId });
    // console.log(foundPlaylist);
    if (foundPlaylist.videoIds.includes(videoId)) {
      return res.status(200).json({ success: true });
    }
    foundPlaylist.videoIds.push(videoId);
    foundPlaylist.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
};

const removeFromPlaylist = async (req, res) => {
  try {
    const { videoId, playlistId } = req.body;
    const userId = req.user.id;
    const foundPlaylist = await Playlist.findOne({ _id: playlistId });
    const indexOfVideo = foundPlaylist.videoIds.indexOf(videoId);
    if (indexOfVideo !== -1) {
      console.log(indexOfVideo);
      foundPlaylist.videoIds.splice(indexOfVideo, 1);
      foundPlaylist.save();
      return res.status(200).json({ success: true });
    }
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

const getVideosInPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const foundPlaylist = await Playlist.findOne({ _id: playlistId }).populate(
      'videoIds',
    );
    console.log(foundPlaylist);
    return res
      .status(200)
      .json({ success: true, videos: foundPlaylist.videoIds });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

module.exports = {
  saveToPlaylist,
  getPlaylists,
  createPlaylist,
  removeFromPlaylist,
  getVideosInPlaylist,
};
