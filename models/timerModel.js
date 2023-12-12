const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  time: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
  },
});
module.exports = mongoose.model("Timer", userSchema);
