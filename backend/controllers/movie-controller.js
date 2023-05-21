const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Movie = require("../models/movie");

const createMovie = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    title,
    description,
    adult,
    release_date,
    language,
    popularity,
    imdb_Rating,
    rotten_Rating,
    user_rating,
    poster,
    poster2,
    backdrop,
    casts,
    genre,
    ytlink,
    watchlink,
    isWebseries,
    studio,
    country,
    status,
  } = req.body;
  const createdMovie = new Movie({
    title,
    description,
    adult,
    release_date,
    language,
    popularity,
    imdb_Rating,
    user_rating,
    rotten_Rating,
    poster,
    poster2,
    backdrop,
    casts,
    genre,
    ytlink,
    watchlink,
    isWebseries,
    studio,
    country,
    status,
    // moviePath: req.file.path,
  });

  try {
    await createdMovie.save();
  } catch (err) {
    const error = new HttpError(
      "Creating moviedata failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    message: "Created movie data successfully",
    movie: createdMovie.toObject({ getters: true }),
  });
};

const getMovies = async (req, res, next) => {
  const qPopular = req.query.popular;
  const qRating = req.query.rating;
  const qNew = req.query.new;
  const qAdult = req.query.adult;
  const qgenre = req.query.genre;
  const qsearch = req.query.search;

  let movies;
  try {
    if (qPopular) {
      movies = await Movie.find().sort({ popularity: -1 });
    } else if (qRating) {
      movies = await Movie.find().sort({ imdb_Rating: -1 });
    } else if (qNew) {
      movies = await Movie.find().sort({ release_date: 1 });
    } else if (qAdult) {
      movies = await Movie.find({
        adult: true,
      });
    } else if (qgenre) {
      movies = await Movie.find({
        genre: {
          $in: [qgenre],
        },
      });
    } else if (qsearch) {
      var regex = new RegExp(qsearch, "i");
      movies = await Movie.find({
        title: regex,
      }).sort({ title: 1 });
    } else {
      movies = await Movie.find({});
    }
  } catch (err) {
    const error = new HttpError(
      "Fetching movies failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    movies: movies.map((movie) => movie.toObject({ getters: true })),
  });

  // res.json(movies);
};

const getMovieById = async (req, res, next) => {
  const movieId = req.params.pid;

  let movie;
  try {
    movie = await Movie.findById(movieId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a Movie.",
      500
    );
    return next(error);
  }

  if (!movie) {
    const error = new HttpError(
      "Could not find a Movie for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ movie: movie.toObject({ getters: true }) });
};

exports.createMovie = createMovie;
exports.getMovies = getMovies;
exports.getMovieById = getMovieById;
