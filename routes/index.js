const express = require('express');
const router = express.Router();
const Movie = require("../models/Movie.model.js")

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));
router.get("/movies", (req, res, next) => {
    Movie.find()
      .then((allTheMoviesFromDB) => {
        // -> allTheMoviesFromDB is a placeholder, it can be any word
        console.log("Retrieved movies from DB:", allTheMoviesFromDB);
        // res.json(allTheMoviesFromDB) // to see the data displayed
        res.render("movies.hbs", { movies: allTheMoviesFromDB });
      })
      .catch((error) => {
        console.log("Error while getting the movies from the DB: ", error);
  
        // Call the error-middleware to display the error page to the user
        next(error);
      });
  });

  router.get("/movies/:movieId", (req, res, next) => {
    const { movieId } = req.params;
  
    Movie.findById(movieId)
      .then((themovie) => res.render("movie-details.hbs", { movie: themovie }))
      .catch((error) => {
        console.log("Error while retrieving movie details: ", error);
  
        // Call the error-middleware to display the error page to the user
        next(error);
      });
  });

module.exports = router;
