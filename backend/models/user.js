const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true, unique: true, max: 50 },
    password: { type: String, required: true, minlength: 6 },
    phoneNumber: { type: String, required: true, minlength: 10 },
    picturePath: { type: String, default: "avatar.png" },
    location: { type: String },
    friends: [{ type: String }],
    occupation: { type: String },
    viewedProfile: { type: Number },
    impressions: { type: Number },
    liked: [
      {
        postid: { type: String },
        postTitle: { type: String },
        postPic: { type: String },
      },
    ],
    savedPosts: [
      {
        postid: { type: String },
        postTitle: { type: String },
        postPic: { type: String },
      },
    ],
    commented: [
      {
        postid: { type: String },
        postTitle: { type: String },
        postPic: { type: String },
        comment: { type: String },
      },
    ],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
