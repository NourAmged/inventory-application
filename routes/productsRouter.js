const { Router } = require("express");
const getProductsPage = require("../controllers/getProductsPage");

const productsRouter = Router();

productsRouter.get("/", getProductsPage);

module.exports = productsRouter;