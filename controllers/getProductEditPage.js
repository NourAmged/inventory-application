const { getProduct } = require('../db/queries');
const { categoryColor } = require("../categoryColor");


async function getProductEditPage(req, res) {
    const id = req.query.id;

    const [product] = await getProduct(id);

    res.render('productPage', {
        product: product, edit: true, categoryColor: categoryColor[product.category]
    });
}

module.exports = getProductEditPage