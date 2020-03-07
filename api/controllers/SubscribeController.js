const Subscribe = require('../models/Subscribe');

const getSubscriberCount = async (req, res) => {
  try {
    const { userTo } = req.query;
    const subscriberCount = await Subscribe.countDocuments({
      userTo,
    });
    return res.status(200).json({ success: true, subscriberCount });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const isSubscribed = async (req, res) => {
  try {
    const { userTo } = req.query;
    const userFrom = req.user.id;
    const subscribes = await Subscribe.find({
      userTo,
      userFrom,
    });

    return res
      .status(200)
      .json({ success: true, isSubscribed: subscribes.length !== 0 });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const subscribe = async (req, res) => {
  try {
    const existingSubscribes = await Subscribe.findOne(req.body);
    if (existingSubscribes) {
      return res.status(200).json({ success: true });
    }
    const savedSubscribe = await new Subscribe(req.body).save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const unSubscribe = async (req, res) => {
  try {
    const deleted = await Subscribe.findOneAndDelete({
      userTo: req.body.userTo,
      userFrom: req.user.id,
    }).exec();

    return res.status(200).json({ success: true, result: deleted });
  } catch (error) {
    return res.json({ success: false, error });
  }
};
module.exports = {
  getSubscriberCount,
  subscribe,
  unSubscribe,
  isSubscribed,
};
