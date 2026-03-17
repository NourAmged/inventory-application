const { DeleteProduct } = require("../db/queries");

async function deleteProduct(req, res) {
    const { id } = req.params;

    await DeleteProduct(id);

    res.redirect("/products");
}

module.exports = deleteProduct;