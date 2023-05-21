const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Post = require("../models/post");
const User = require("../models/user");

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, userId, picturePath } = req.body;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Creating post failed, please try again.", 500);
    return next(error);
  }

  const createdPost = new Post({
    title,
    description,
    userId,
    userName: user.userName,
    userPicturePath: user.picturePath,
    location: user.location,
    likes: [],
    comments: [],
    picturePath,
  });

  // console.log(createdPost);
  try {
    await createdPost.save();
  } catch (err) {
    const error = new HttpError("Creating post failed", 500);
    return next(error);
  }
  res.status(200).json({ message: "Post Created" });
};

const getFeedPosts = async (req, res, next) => {
  let posts;

  try {
    posts = await Post.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching posts failed, please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

const getUserPosts = async (req, res, next) => {
  const userId = req.params.pid;
  let posts;

  try {
    posts = await Post.find({ userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching posts failed, please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

const likePost = async (req, res, next) => {
  const postId = req.params.pid;
  const userId = req.body.userId;
  // console.log(postId, userId);
  let post;
  let user;

  try {
    post = await Post.findById(postId);
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Fetching posts failed, please try again later.",
      500
    );
    return next(error);
  }
  // console.log(post);
  // console.log(user);

  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter((id) => id !== userId);
    user.liked = user.liked.filter((item) => item.postid !== postId);
  } else {
    post.likes.push(userId);
    user.liked.push({
      postid: postId,
      postTitle: post.title,
      postPic: post.picturePath,
    });
  }

  let updatedPost;
  try {
    updatedPost = await Post.findByIdAndUpdate(postId, { likes: post.likes });
    await User.findByIdAndUpdate(userId, { liked: user.liked });
  } catch (err) {
    const error = new HttpError(
      "Updating posts failed, please try again later.",
      404
    );
    return next(error);
  }

  res
    .status(200)
    .json({ updatedPost: updatedPost.toObject({ getters: true }) });
};

const savePost = async (req, res, next) => {
  const postId = req.params.pid;
  const userId = req.body.userId;
  // console.log(postId, userId);
  let post;
  let user;

  try {
    post = await Post.findById(postId);
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Fetching posts failed, please try again later.",
      500
    );
    return next(error);
  }
  // console.log(post);
  // console.log(user);

  if (post.savedBy.includes(userId)) {
    post.savedBy = post.savedBy.filter((id) => id !== userId);
    user.savedPosts = user.savedPosts.filter((item) => item.postid !== postId);
  } else {
    post.savedBy.push(userId);
    user.savedPosts.push({
      postid: postId,
      postTitle: post.title,
      postPic: post.picturePath,
    });
  }

  let updatedPost;
  try {
    updatedPost = await Post.findByIdAndUpdate(postId, {
      savedBy: post.savedBy,
    });
    await User.findByIdAndUpdate(userId, { savedPosts: user.savedPosts });
  } catch (err) {
    const error = new HttpError(
      "Updating posts failed, please try again later.",
      404
    );
    return next(error);
  }

  res
    .status(200)
    .json({ updatedPost: updatedPost.toObject({ getters: true }) });
};

const commentPost = async (req, res, next) => {
  const postId = req.params.pid;
  const userId = req.body.userId;

  let post;
  let user;
  try {
    post = await Post.findById(postId);
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Fetching posts failed, please try again later.",
      500
    );
    return next(error);
  }
  // console.log(post);
  post.comments.push({
    commentedbyId: userId,
    commentedby: req.body.userName,
    commentedbyPic: req.body.userPic,
    comment: req.body.comment,
  });
  user.commented.push({
    postid: postId,
    postTitle: post.title,
    postPic: post.picturePath,
    comment: req.body.comment,
  });
  let updatedPost;
  try {
    updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        comments: post.comments,
      },
      { new: true }
    );
    await User.findByIdAndUpdate(userId, { commented: user.commented });
  } catch (err) {
    const error = new HttpError(
      "Updating posts failed, please try again later.",
      404
    );
    return next(error);
  }

  // console.log(updatedPost);
  res.status(200).json({ updatedPost });
};

exports.createPost = createPost;
exports.getUserPosts = getUserPosts;
exports.getFeedPosts = getFeedPosts;
exports.likePost = likePost;
exports.savePost = savePost;
exports.commentPost = commentPost;
