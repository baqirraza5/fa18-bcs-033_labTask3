var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  name: String,
  price: Number,
});

var Product = mongoose.model("Product", productSchema);

module.exports = Product;
