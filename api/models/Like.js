const mongoose = require('mongoose');

const { Schema } = mongoose;

const likeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      refPath: 'onModel',
      type: Schema.Types.ObjectId,
      required: true,
    },
    onModel: {
      type: String,
      required: true,
      enum: ['Comment', 'Video'],
    },
    type: {
      type: String,
      enum: ['like', 'dislike'],
      required: true,
    },
  },
  { timestamps: true },
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
