const { body, validationResult, matchedData } = require("express-validator");
const { patchProduct, getProduct } = require("../db/queries");
const { categoryColor } = require("../categoryColor");

const validateUpdate = [
    body("price").isFloat({ min: 0.01, max: Infinity }).
        withMessage("lowest value for prise is 0.01$"),

    body("quantity").isInt({ min: 1, max: 150 }).
        withMessage("The quantity should be between 1 and 150"),

    body("description").trim().
        isLength({ min: 10, max: 250 }).withMessage("The description should be between 10 and 250")
]


const updateProduct = [
    validateUpdate,
    async (req, res) => {
        const id = req.query.id;

        const errors = validationResult(req);
        const [product] = await getProduct(id);
        const color = categoryColor[product.category];

        if (!errors.isEmpty()) {
            res.status(400).render('productPage', { product: product, errors: errors.array(), edit: false, categoryColor: color })
            return;
        }

        const productData = matchedData(req);
        await patchProduct(id, productData);

        res.redirect("/products");
    }
]


module.exports = updateProduct;