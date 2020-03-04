const ffmpeg = require('fluent-ffmpeg');

const generateThumbnail = filePath => {
  let thumbsFilePaths = '';
  let fileDuration = '';
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      // console.dir(metadata);
      // console.log(metadata.format.duration);

      fileDuration = metadata.format.duration;
    });

    ffmpeg(filePath)
      .on('filenames', filenames => {
        console.log(`Will generate ${filenames.join(', ')}`);
        thumbsFilePaths = filenames.map(
          filename => `uploads/thumbnails/${filename}`,
        );
      })
      .on('end', () => {
        console.log('Screenshots taken');
        resolve({
          thumbsFilePaths: thumbsFilePaths,
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
  });
};

module.exports = {
  generateThumbnail,
};
