const movieModel = require("../models/movieModel.js");
const API_KEY = require("../../config.js").API_KEY;
const db = require("../../db/mongodb/index");
const axios = require("axios");

module.exports = {
  getSearch: (req, res) => {
    // requires client to send genre in query
    let genreID = req.query.genre;

    axios
      .get("https://api.themoviedb.org/3/discover/movie", {
        params: {
          api_key: API_KEY,
          with_genres: genreID,
          sort_by: "vote_average.desc"
        }
      })
      .then(({ data }) => {
        parseImages(data.results);
        res.send(data.results);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getGenres: (req, res) => {
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: API_KEY
        }
      })
      .then(({ data }) => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getFavorites: (req, res) => {
    db.getFavorites().then(results => {
      res.send(results);
    });
  },
  saveMovie: (req, res) => {
    // requires client to send full details of movie to server as {}
    const movie = req.body;
    movieModel.db
      .addFavorite(movie)
      .then(() => {
        return db.getFavorites();
      })
      .then(results => {
        res.send(results);
      })
      .catch(err => {
        console.log(err);
      });
  },
  deleteMovie: (req, res) => {
    // requires client to send title of movie to delete
    let movieTitle = req.query.title;
    movieModel.db
      .removeFavorite(movieTitle)
      .then(removed => {
        console.log(removed);
        res.send(removed);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

parseImages = resultsArray => {
  for (let i = 0; i < resultsArray.length; i++) {
    if (!resultsArray[i].poster_path) {
      resultsArray[i].poster_path = "unknown.png";
    } else {
      resultsArray[
        i
      ].poster_path = `https://image.tmdb.org/t/p/w500/${resultsArray[i].poster_path}`;
    }
  }
};
