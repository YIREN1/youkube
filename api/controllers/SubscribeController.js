const Subscribe = require('../models/Subscribe');

const getSubscriberCount = async (req, res) => {
  try {
    const savedSubscribe = await new Subscribe(req.body).save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const isSubscribed = async (req, res) => {
  try {
    const subscribes = await Subscribe.find({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    }).exec();

    return res
      .status(200)
      .json({ success: true, isSubscribed: subscribes !== 0 });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const subscribe = async (req, res) => {
  try {
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
      userFrom: req.body.userFrom,
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
