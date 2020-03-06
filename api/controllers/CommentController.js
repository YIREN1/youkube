const Comment = require('../models/Comment');
// const User = require('../models/User');

const saveComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    comment.author = req.user.id;
    const savedComment = await comment.save();
    // const author = User.findOne({ id: savedComment.author });
    savedComment.author = req.user;
    return res.status(200).json({ success: true, savedComment });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const getComments = async (req, res) => {
  try {
    const { videoId } = req.query;
    const comments = await Comment.find({ postId: videoId }).populate('author');
    return res.status(200).json({ success: true, comments });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const getReplyComments = async (req, res) => {
  try {
    const { videoId, responseTo } = req.query;
    const comments = await Comment.find({
      postId: videoId,
      responseTo,
    }).populate('author');
    return res.status(200).json({ success: true, comments });
  } catch (error) {
    return res.json({ success: false, error });
  }
};
module.exports = { saveComment, getComments, getReplyComments };
