const { getProducts } = require("../db/queries");

const { categoryColor } = require("../categoryColor");

async function getProductsPage(req, res) {

    const filters = req.query;

    const products = await getProducts(filters);

    res.render("productsPage", { products: products, categoryColor: categoryColor });
}

module.exports = getProductsPage;