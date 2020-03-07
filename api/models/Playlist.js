const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaylistSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    videoIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
  },
  { timestamps: true },
);

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = Playlist;
