const express = require("express");
let router = express.Router();
const validateMovie = require("../../middlewares/validateMovie");
var { Movie } = require("../../models/movie");

//GET all products
router.get("/", async (req, res) => {
  //First three lines are for pagination
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let movies = await Movie.find().skip(skipRecords).limit(perPage);
  return res.send(movies);
});

//GET single product
router.get("/:id", async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(400).send("Movie with given ID not found"); //product with given ID not present
    return res.send(movie); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); //format of ID is not correct
  }
});

//update a product
router.put("/:id", validateMovie, async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  movie.name = req.body.name;
  movie.overview = req.body.overview;
  await movie.save();
  return res.send(movie);
});

//delete a product
router.delete("/:id", async (req, res) => {
  try {
    let movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie)
      return res.status(400).send("Movie with given ID already deleted"); //product with given ID not present
    return res.send(movie); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); //format of ID is not correct
  }
});

//Insert a record
router.post("/", validateMovie, async (req, res) => {
  let movie = new Movie();
  movie.name = req.body.name;
  movie.overview = req.body.overview;
  await movie.save();
  return res.send(movie);
});

module.exports = router;
