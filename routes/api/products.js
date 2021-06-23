const express = require("express");
let router = express.Router();
const validateProduct = require("../../middlewares/validateProduct");
var { Product } = require("../../models/product");

//GET all products
router.get("/", async (req, res) => {
  //First three lines are for pagination
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let products = await Product.find().skip(skipRecords).limit(perPage);
  return res.send(products);
});

//GET single product
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product with given ID not found"); //product with given ID not present
    return res.send(product); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); //format of ID is not correct
  }
});

//update a product
router.put("/:id", validateProduct, async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  return res.send(product);
});

//delete a product
router.delete("/:id", async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(400).send("Product with given ID already deleted"); //product with given ID not present
    return res.send(product); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); //format of ID is not correct
  }
});

//Insert a record
router.post("/", validateProduct, async (req, res) => {
  let product = new Product();
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  return res.send(product);
});

module.exports = router;
