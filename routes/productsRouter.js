const { Router } = require("express");
const getProductsPage = require("../controllers/getProductsPage");
const getProductPage = require("../controllers/getProductPage");

const productsRouter = Router();


productsRouter.get("/", getProductsPage);
productsRouter.get("/:id", getProductPage);


module.exports = productsRouter;