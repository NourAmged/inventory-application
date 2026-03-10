
const pool = require('./pool');


async function getProducts(filters) {
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

async function postProduct(productData, categoryColor, filename) {
    const { productName, productPrice, productCategory,
        productColor, productDescription,
        productQuantity } = productData;

    categoryColor[productCategory] = productColor;

    await pool.query(
        `
        INSERT INTO products (name, category, price, quantity, description, image)
        VALUES
        ( ($1), ($2), ($3), ($4), ($5), ($6) );
        `, [productName, productCategory, productPrice, productQuantity, productDescription, filename ? filename : '../images/fork-and-knife-with-plate-svgrepo-com.svg']);


}


async function searchProducts(search) {
    const { rows } = await pool.query(`SELECT * FROM products WHERE name LIKE ($1) `, [`%${search}%`]);
    return rows;
}

module.exports = {
    getProducts,
    getProduct,
    patchProduct,
    postProduct,
    searchProducts
};