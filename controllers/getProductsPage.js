const { getProducts } = require("../db/queries");

async function getProductsPage(req, res) {
    const products = await getProducts();
    res.render("productsPage", { products: products })
}

module.exports = getProductsPage;