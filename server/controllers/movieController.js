const movieModel = require("../models/movieModel.js");
const apiHelpers = require("../helpers/apiHelpers.js");
const API_KEY = require("../../config.js").API_KEY;
// console.log("API_KEY", API_KEY);
const axios = require("axios");

module.exports = {
  getSearch: (req, res) => {
    // requires client to send genre in query

    let genreID = req.query.genre;
    // 28 is Action
    axios
      .get("https://api.themoviedb.org/3/discover/movie", {
        params: {
          api_key: API_KEY,
          with_genres: genreID,
          sort_by: "vote_average.desc"
        }
      })
      .then(({ data }) => {
        res.send(data.results);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getGenres: (req, res) => {
    // does not require client to send anything
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: API_KEY
        }
      })
      .then(({ data }) => {
        res.send(data.genres);
      })
      .catch(err => {
        console.log(err);
      });
  },
  saveMovie: (req, res) => {
    // requires client to send full details of movie to server as {}
    const movie = req.body;
    movieModel.db
      .addFavorite(movie)
      .then(saved => {
        console.log(saved);
        res.send(saved);
      })
      .catch(err => {
        console.log(err);
      });
  },
  deleteMovie: (req, res) => {
    // requires client to send title of movie to delete
    let movie = req.body;
    movieModel.db
      .removeFavorite(movie)
      .then(removed => {
        console.log(removed);
        res.send(removed);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
