const Like = require('../models/Like');

const getLikesCount = async (req, res) => {
  try {
    const { videoId, commentId } = req.query;

    const likeCount = await Like.countDocuments({
      postId: videoId || commentId,
      onModel: videoId ? 'Video' : 'Comment',
      type: 'like',
    });
    const dislikeCount = await Like.countDocuments({
      postId: videoId || commentId,
      onModel: videoId ? 'Video' : 'Comment',

      type: 'dislike',
    });
    return res.status(200).json({ success: true, likeCount, dislikeCount });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const isLiked = async (req, res) => {
  try {
    const { videoId, commentId } = req.query;

    const like = await Like.findOne({
      userId: req.user.id,
      postId: videoId || commentId,
      onModel: videoId ? 'Video' : 'Comment',
    });
    let type = 'none';
    if (like) {
      ({ type } = like);
    }
    return res.status(200).json({ success: true, type });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const like = async (req, res) => {
  try {
    const { videoId, commentId, type } = req.body;
    const likeBody = {
      userId: req.user.id,
      postId: videoId || commentId,
      onModel: videoId ? 'Video' : 'Comment',
    };
    const existingLike = await Like.findOne(likeBody);
    if (existingLike) {
      existingLike.type = type;
      await existingLike.save();
    } else {
      likeBody.type = type;
      await new Like(likeBody).save();
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};

const removeLike = async (req, res) => {
  try {
    const { videoId, commentId } = req.body;
    const deleted = await Like.findOneAndDelete({
      userId: req.user.id,
      postId: videoId || commentId,
      onModel: videoId ? 'Video' : 'Comment',
    });
    if (!deleted) {
      return res.status(404).json({ success: false, result: 'like not found' });
    }

    return res.status(200).json({ success: true, result: deleted });
  } catch (error) {
    return res.json({ success: false, error });
  }
};
module.exports = {
  getLikesCount,
  like,
  removeLike,
  isLiked,
};
