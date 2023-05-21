const express = require("express");
const multer = require("multer");

const router = express.Router();

const postController = require("../controllers/post-controller");
const { verifyUser, verifyAdmin } = require("../middleware/verify");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./posts/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  verifyUser,
  upload.single("picture"),
  postController.createPost
);
router.get("/", verifyUser, postController.getFeedPosts);
router.get("/:userId/posts", verifyUser, postController.getUserPosts);
router.patch("/:pid/likes", verifyUser, postController.likePost);
router.patch("/:pid/saves", verifyUser, postController.savePost);
router.patch("/:pid/comments", verifyUser, postController.commentPost);

module.exports = router;
