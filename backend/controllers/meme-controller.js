const HttpError = require("../models/http-error");
const Meme = require("../models/meme");

const createMeme = async (req, res, next) => {
  const { title, imgPath, imgSize, videoPath } = req.body;
  const createdMeme = new Meme({
    title,
    imgPath,
    imgSize,
    videoPath,
  });

  try {
    await createdMeme.save();
  } catch (err) {
    const error = new HttpError("Creating Meme Failed", 500);
    return next(error);
  }

  res.status(201).json({
    message: "Created meme Succefully",
    meme: createdMeme.toObject({ getters: true }),
  });
};

const getMemes = async (req, res, next) => {
  let memes;
  try {
    memes = await Meme.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching memes failed, please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ memes: memes.map((meme) => meme.toObject({ getters: true })) });
};

exports.createMeme = createMeme;
exports.getMemes = getMemes;
