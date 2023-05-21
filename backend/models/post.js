const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    picturePath: { type: String },
    userId: { type: String },
    userName: { type: String },
    userPicturePath: { type: String },
    location: { type: String },
    likes: [{ type: String }],
    savedBy: [{ type: String }],
    comments: [
      {
        commentedby: { type: String },
        commentedbyPic: { type: String },
        commentedbyId: { type: String },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
