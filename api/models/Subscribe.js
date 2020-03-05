const mongoose = require('mongoose');

const { Schema } = mongoose;

const subscribeSchema = mongoose.Schema(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  { timestamps: true },
);

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = Subscribe;
