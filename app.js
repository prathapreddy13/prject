//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/productDB", {
  useNewUrlParser: true
});

const productScheme = {
  name: String,
  description: String
};
const Product = mongoose.model("products", productScheme);




app.get("/products", function(req, res) {
  Product.find(function(err, products) {
    if (err)
      res.send(err);
    else
      res.send(products);
  });
});
app.post("/products", function(req, res) {

  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description
  });
  newProduct.save(function(err) {
    if (err) {
      res.send("error");
    } else res.send("success");
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
