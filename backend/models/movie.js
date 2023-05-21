const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    adult: { type: Boolean },
    isWebseries: { type: Boolean },
    release_date: { type: String },
    language: { type: String },
    popularity: { type: String },
    imdb_Rating: { type: String },
    rotten_Rating: { type: String },
    user_rating: { type: String },
    poster: { type: String },
    poster2: { type: String },
    backdrop: { type: String },
    casts: [
      {
        name: { type: String },
        dp: { type: String },
        characterName: { type: String },
      },
    ],
    genre: { type: Array },
    ytlink: { type: String },
    watchlink: { type: String },
    runtime: { type: String },
    moviePath: { type: String },
    studio: { type: String },
    country: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
