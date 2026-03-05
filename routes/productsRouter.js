const { Router } = require("express");

const getProductsPage = require("../controllers/getProductsPage");
const getProductPage = require("../controllers/getProductPage");
const updateProduct = require("../controllers/updateProduct");

const productsRouter = Router();


productsRouter.get("/", getProductsPage);

productsRouter.patch("/edit", updateProduct);

productsRouter.get("/:id/", getProductPage);
productsRouter.get("/:id/edit", getProductPage);


module.exports = productsRouter;