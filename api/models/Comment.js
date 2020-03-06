const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

commentSchema.set('toJSON', {
  virtuals: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
