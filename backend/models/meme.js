const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memeSchema = new Schema(
  {
    title: { type: String, required: true },
    imgPath: { type: String },
    imgSize: { type: String, required: true },
    videoPath: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meme", memeSchema);
