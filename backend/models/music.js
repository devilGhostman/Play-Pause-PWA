const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const musicSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    poster: { type: String, required: true },
    songPath: { type: String, required: true },
    songType: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Music", musicSchema);
