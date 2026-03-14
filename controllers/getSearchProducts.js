const { searchProducts } = require('../db/queries');
const { categoryColor } = require("../categoryColor");

async function getSearchProducts(req, res) {
    const search = req.query.search;
    const products = await searchProducts(search);
    res.render("searchedProduct", { search: search, products: products, categoryColor: categoryColor });
}

module.exports = getSearchProducts;