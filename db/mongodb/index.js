const mongoose = require("mongoose");
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost:27017/badmovies", {
    useNewUrlParser: true
  });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to db...");
});

const badMovieList = mongoose.Schema({
  title: String,
  genres: Array,
  release_date: String,
  poster: String,
  popularity: Number,
  vote_avg: Number,
  favorite: Boolean
});

const Movie = mongoose.model("BadMovie", badMovieList);
db.addFavorite = movie => {
  return new Promise((resolve, reject) => {
    let item = new Movie({
      title: movie.title,
      genres: movie.genre_ids,
      release_date: movie.release_date,
      poster: movie.poster_path,
      popularity: movie.poster,
      vote_avg: movie.vote_average,
      favorite: true
    });
    item.save(err => {
      if (err) {
        reject(err);
      } else {
        resolve("saved!");
      }
    });
  });
};

module.exports = db;
