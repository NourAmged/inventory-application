const { Router } = require("express");

const getProductsPage = require("../controllers/getProductsPage");
const getProductPage = require("../controllers/getProductPage");
const getAddProductPage = require("../controllers/getAddProductPage");
const updateProduct = require("../controllers/updateProduct");
const addProduct = require("../controllers/postProduct");


const productsRouter = Router();


productsRouter.get("/", getProductsPage);

productsRouter.get("/add", getAddProductPage)
productsRouter.get("/:id/", getProductPage);
productsRouter.get("/:id/edit", getProductPage);

productsRouter.patch("/edit", updateProduct);
productsRouter.post("/add", addProduct)



module.exports = productsRouter;