const express = require("express");
const multer = require("multer");
const { check } = require("express-validator");

const movieController = require("../controllers/movie-controller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./movies/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", movieController.getMovies);
router.get("/:pid", movieController.getMovieById);

router.post(
  "/",
  // upload.single("moviePath"),
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  movieController.createMovie
);

module.exports = router;
