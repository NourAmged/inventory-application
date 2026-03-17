const { getProduct } = require('../db/queries');
const { categoryColor } = require("../categoryColor");

async function getProductPage(req, res) {
    const { id } = req.params;
    const edit = req.path.includes('edit');
    const [product] = await getProduct(id);

    if (!product) {
        return res.status(404).send("Product not found");
    }

    res.render("productPage", {
        product,
        categoryColor: categoryColor[product.category],
        edit
    });
}

module.exports = getProductPage;