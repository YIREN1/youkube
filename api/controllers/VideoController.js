const multer = require('multer');
const path = require('path');
const Video = require('../models/Video');
const VideoService = require('../services/VideoService');

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

  try {
    const savedVideo = await video.save();
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  uploadVideo,
  submitVideo,
};
