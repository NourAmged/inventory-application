const { body, validationResult, matchedData } = require("express-validator");
const { postProduct } = require("../db/queries");
const { categoryColor } = require("../categoryColor");
const fs = require('fs');

const validateProduct = [
    body("productName").trim()
        .isLength({ max: 15 }).withMessage("maximum characters for product name is 15."),

    body("productPrice").isFloat({ min: 0.01, max: Infinity }).
        withMessage("lowest value for price is 0.01$"),

    body("productCategory").trim()
        .isLength({ max: 15 }).withMessage("maximum characters for product category is 15."),

    body("productColor"),

    body("productDescription").trim().
        isLength({ min: 10, max: 250 }).withMessage("The description should be between 10 and 250."),

    body("productQuantity").isInt({ min: 1, max: 150 }).
        withMessage("The quantity should be between 1 and 150."),

]

const addProduct = [
    validateProduct,
    async (req, res) => {
        const errors = validationResult(req);

        let filename = null;

        if (req.file && req.file.originalname) {
            filename = `../images/${req.file.originalname}`;
            filenameD = `public/images/${req.file.originalname}`; //for deletion
        }

        if (!errors.isEmpty()) {
            if (filename)
                fs.unlink(filenameD, (err) => {
                    if (err)
                        console.log(err);
                });
            return res.status(400).render("addProduct", { errors: errors.array() });
        }


        const productData = matchedData(req);

        await postProduct(productData, categoryColor, filename);

        res.redirect("/products");
    }
];


module.exports = addProduct;
