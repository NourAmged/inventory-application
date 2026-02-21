const pool = require('./pool');

async function getProducts(params) {
    const { rows } = await pool.query("SELECT * FROM products;");
    return rows;
}


module.exports = {
    getProducts,
};