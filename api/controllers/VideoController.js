const multer = require('multer');
const path = require('path');
const Video = require('../models/Video');
const Like = require('../models/Like');

const VideoService = require('../services/VideoService');
const Subscribe = require('../models/Subscribe');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    console.log(ext, 'ext');
    if (ext !== '.mp4') {
      cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage }).single('file');

const uploadVideo = (req, res) => {
  upload(req, res, async err => {
    if (err) {
      return res.json({ success: false, err });
    }
    try {
      const result = await VideoService.generateThumbnail(res.req.file.path);
      return res.json({
        success: true,
        filePath: res.req.file.path,
        thumbsFilePaths: result.thumbsFilePaths,
        fileDuration: result.fileDuration,
        fileName: res.req.file.filename,
      });
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  });
};

const getThumbnail = (req, res) => {
  //
};
const submitVideo = async (req, res) => {
  const video = new Video(req.body);
  video.author = req.user.id;
  try {
    const savedVideo = await video.save();
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('author')
      .exec();
    return res.status(200).json({ success: true, videos });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    // todo
    const video = await Video.findOne({ _id: videoId })
      .populate('author')
      .exec();
    if (!video) {
      return res.status(404).send('video not found');
    }
    return res.status(200).json({ success: true, video });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const getSubscriptionVideos = async (req, res) => {
  try {
    const userFrom = req.user;
    const subscriptions = await Subscribe.find({
      userFrom,
    });
    const subscribedUsers = subscriptions.map(
      subscription => subscription.userTo,
    );
    const videos = await Video.find({
      author: { $in: subscribedUsers },
    }).populate('writer');

    res.status(200).json({ success: true, videos });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getLikedVideos = async (req, res) => {
  try {
    const likedVideos = await Like.find({
      userId: req.user.id,
      onModel: 'Video',
      type: 'like',
    }).populate({
      path: 'postId',
      populate: { path: 'author' },
    });
    return res.status(200).json({
      success: true,
      likedVideos: likedVideos.map(({ postId }) => postId),
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  uploadVideo,
  submitVideo,
  getVideos,
  getVideo,
  getSubscriptionVideos,
  getLikedVideos,
};
