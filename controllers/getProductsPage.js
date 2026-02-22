const { getProducts } = require("../db/queries");

const { categoryColor } = require("../categoryColor");

async function getProductsPage(req, res) {
    const products = await getProducts();

    res.render("productsPage", { products: products, categoryColor: categoryColor });
}

module.exports = getProductsPage;