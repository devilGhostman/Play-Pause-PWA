const mongoose = require("mongoose");
const multer = require("multer");

const HttpError = require("../models/http-error");
const Music = require("../models/music");

const createMusic = async (req, res, next) => {
  const { title, artist, poster, songType } = req.body;
  const createdMusic = new Music({
    title,
    artist,
    poster,
    songType,
    songPath: req.file.path,
  });

  try {
    await createdMusic.save();
  } catch (err) {
    const error = new HttpError("Creating musicdata failed", 500);
    return next(error);
  }

  res
    .status(201)
    .json({
      message: "Created song successfully",
      music: createdMusic.toObject({ getters: true }),
    });
};

const getMusics = async (req, res, next) => {
  let musics;
  try {
    musics = await Music.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching songs failed, please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ musics: musics.map((music) => music.toObject({ getters: true })) });
};

const getMusicById = async (req, res, next) => {
  const musicId = req.params.pid;

  let music;
  try {
    music = await Music.findById(musicId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a Movie.",
      500
    );
    return next(error);
  }

  if (!music) {
    const error = new HttpError(
      "Could not find a Movie for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ music: music.toObject({ getters: true }) });
};

exports.createMusic = createMusic;
exports.getMusics = getMusics;
exports.getMusicById = getMusicById;
