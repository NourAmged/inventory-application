const { Router } = require("express");

const getProductsPage = require("../controllers/getProductsPage");
const getProductPage = require("../controllers/getProductPage");
const getProductEditPage = require("../controllers/getProductEditPage")

const productsRouter = Router();


productsRouter.get("/", getProductsPage);

productsRouter.get("/edit", getProductEditPage);
productsRouter.get("/:id", getProductPage);


module.exports = productsRouter;