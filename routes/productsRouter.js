const { Router } = require("express");
const multer = require("multer");

const getProductsPage = require("../controllers/getProductsPage");
const getProductPage = require("../controllers/getProductPage");
const getAddProductPage = require("../controllers/getAddProductPage");
const updateProduct = require("../controllers/updateProduct");
const addProduct = require("../controllers/postProduct");
const getSearchProducts = require("../controllers/getSearchProducts");

const productsRouter = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

productsRouter.get("/", getProductsPage);

productsRouter.get("/search", getSearchProducts);
productsRouter.get("/add", getAddProductPage);

productsRouter.get("/:id/", getProductPage);
productsRouter.get("/:id/edit", getProductPage);

productsRouter.patch("/edit", updateProduct);
productsRouter.post("/add", upload.single('productImage'), addProduct);



module.exports = productsRouter;