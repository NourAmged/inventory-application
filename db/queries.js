const pool = require('./pool');

async function getProducts() {
    const { rows } = await pool.query("SELECT * FROM products;");
    return rows;
}

async function getProduct(id) {
    const { rows } = await pool.query("SELECT * FROM products WHERE id = ($1);", [id]);
    return rows;
}

async function patchProduct(id, data) {
    const { price, description, quantity } = data;
    await pool.query("UPDATE products SET price = ($1), description = ($2), quantity = ($3) WHERE id = ($4);",
        [price, description, quantity, id]
    );
}


module.exports = {
    getProducts,
    getProduct,
    patchProduct
};