//IF you are using OPTION 2 under server/index.js, then refer to this file

const router = require("express").Router();
const movieController = require("../controllers/movieController.js");

//Route different requests to different endpoints
router.get("/search", movieController.getSearch);
// use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
// and sort them by votes (worst first) using the search parameters in themoviedb API
// do NOT save the results into the database; render results directly on the page

router.get("/genres", movieController.getGenres);
// make an axios request to get the official list of genres from themoviedb
// use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list

router.post("/save", movieController.saveMovie);
//save movie as favorite into the database

router.delete("/delete", movieController.deleteMovie);
//remove movie from favorites into the database

module.exports = router;
