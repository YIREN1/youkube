const mongoose = require('mongoose');

const { Schema } = mongoose;

const videoSchema = mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    privacy: {
      type: Number,
    },
    filePath: {
      type: String,
    },
    catogory: String,
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true },
);
videoSchema.set('toJSON', {
  virtuals: true,
});

videoSchema.set('toObject', {
  virtuals: true,
});
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
