const { getProducts } = require("../db/queries");


async function getProductsPage(req, res) {
    const categoryColor = {
        Bakery: '#ffc26c',
        Fruits: '#FF0062',
        Dairy: '#FFFEEB',
    }


    const products = await getProducts();
    res.render("productsPage", { products: products, categoryColor: categoryColor })
}

module.exports = getProductsPage;