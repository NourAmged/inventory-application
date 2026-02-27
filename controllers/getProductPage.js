const { getProduct } = require('../db/queries');
const { categoryColor } = require("../categoryColor");

async function getProductPage(req, res) {
    const { id } = req.params;

    const [product] = await getProduct(id);
    res.render("productPage", { product: product, categoryColor: categoryColor[product.category], edit: false });

}

module.exports = getProductPage;