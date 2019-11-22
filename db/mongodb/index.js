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
  poster: String,
  release_date: String,
  popularity: Number,
  vote_average: Number
});

const Movie = mongoose.model("BadMovie", badMovieList);
db.addFavorite = movie => {
  return new Promise((resolve, reject) => {
    let item = new Movie({
      title: movie.title,
      poster: movie.poster_path,
      release_date: movie.release_date,
      popularity: movie.popularity,
      vote_average: movie.vote_average
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

db.removeFavorite = movieTitle => {
  return Movie.deleteMany({ title: movieTitle });
};

db.getFavorites = () => {
  return Movie.find();
};

module.exports = db;
