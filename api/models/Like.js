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
      type: Schema.Types.ObjectId,
      enum: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment',
        },
        {
          type: Schema.Types.ObjectId,
          ref: 'Video',
        },
      ],
      required: true,
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

module.exports = { Like };
