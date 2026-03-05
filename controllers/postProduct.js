const { body, validationResult, matchedData } = require("express-validator");
const { postProduct } = require("../db/queries");
const { categoryColor } = require("../categoryColor");

const validateProduct = [
    body("product-name").trim()
        .isLength({ max: 15 }).withMessage("maximum characters for product name is 15."),

    body("product-price").isFloat({ min: 0.01, max: Infinity }).
        withMessage("lowest value for prise is 0.01$"),

    body("product-category").trim()
        .isLength({ max: 15 }).withMessage("maximum characters for product category is 15."),

    body("product-color"),
    
    body("product-image"),
    
    body("product-description").trim().
        isLength({ min: 10, max: 250 }).withMessage("The description should be between 10 and 250."),

    body("product-quantity").isInt({ min: 1, max: 150 }).
        withMessage("The quantity should be between 1 and 150."),

]

const addProduct = [
    validateProduct,
    async (req, res) => {
        console.log();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("addProduct", { errors: errors.array() });
        }
        const productData = matchedData(req);
        console.log(productData);

        await postProduct(productData, categoryColor);

        res.redirect("/products");
    }
];


module.exports = addProduct;
