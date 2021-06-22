const express = require("express");
let router = express.Router();

var Product = require("../../models/product");

//GET all products
router.get("/", async (req, res) => {
  let products = await Product.find();
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

router.put("/", async (req, res) => {});

module.exports = router;
