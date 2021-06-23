var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

var movieSchema = mongoose.Schema({
  name: String,
  overview: String,
});

var Movie = mongoose.model("Movie", movieSchema);

function validateMovie(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    overview: Joi.string().min(0).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
