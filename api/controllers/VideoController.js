const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

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
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

const getThumbnail = (req, res) => {
  let thumbsFilePath = '';
  let fileDuration = '';

  ffmpeg.ffprobe(req.body.filePath, (err, metadata) => {
    // console.dir(metadata);
    // console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });

  ffmpeg(req.body.filePath)
    .on('filenames', filenames => {
      console.log(`Will generate ${filenames.join(', ')}`);
      thumbsFilePath = `uploads/thumbnails/${filenames[0]}`;
    })
    .on('end', () => {
      console.log('Screenshots taken');
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: 'uploads/thumbnails',
      size: '320x240',
      // %b input basename ( filename w/o extension )
      filename: 'thumbnail-%b.png',
    });
};

module.exports = {
  uploadVideo,
  getThumbnail,
};
