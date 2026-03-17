
const pool = require('./pool');
const categoryColor = require("../categoryColor");
const fs = require('fs');

function customQuery(filters) {
    const priceSort = filters["price-sort"];
    const nameSort = filters["name-sort"];
    let categories = filters["category"];

    let sql = "SELECT * FROM products";

    if (!Array.isArray(categories))
        categories = [categories];

    if (categories && categories.length > 0) {

        let indices = "";
        for (let i = 1; i <= categories.length; i++) {
            indices += `$${i},`;
        }
        indices = indices.slice(0, -1);
        sql += ` WHERE category IN (${indices})`;
    }

    const orderings = [];

    const getSortDirection = (dir) => {
        const safeDir = typeof dir === 'string' ? dir.toUpperCase() : '';
        return safeDir === 'DESC' ? 'DESC' : 'ASC';
    };

    if (priceSort) {
        orderings.push(`price ${getSortDirection(priceSort)}`);
    }

    if (nameSort) {
        orderings.push(`name ${getSortDirection(nameSort)}`);
    }

    if (orderings.length > 0) {
        sql += ` ORDER BY ${orderings.join(", ")}`;
    }

    sql += ";";
    return { text: sql, values: categories };
}

async function getProducts(filters) {
    if (Object.keys(filters).length === 0) {
        const { rows } = await pool.query("SELECT * FROM products;");
        return rows;
    }

    const { text, values } = customQuery(filters);
    const { rows } = await pool.query(text, values);
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
    const { rows } = await pool.query(`SELECT * FROM products WHERE name LIKE ($1); `, [`%${search}%`]);
    return rows;
}

async function DeleteProduct(id) {

    const { rows } = await pool.query("DELETE FROM products WHERE id = $1 RETURNING category, image;", [id]);


    const result = await pool.query("SELECT category FROM products;");

    const categories = result.rows.map(row => {
        return row.category;
    });

    const category = rows[0].category;
    let image = rows[0].image;

    const defaultImage = '../images/fork-and-knife-with-plate-svgrepo-com.svg';

    if (!categories.includes(category))
        delete categoryColor.categoryColor[category];

    if (image !== defaultImage) {
        const path = "public";
        image += '.';
        image = path + image.slice(2, -1);
        fs.unlink(image, (err) => {
            if (err)
                console.log(err);
        });
    }


}

module.exports = {
    getProducts,
    getProduct,
    patchProduct,
    postProduct,
    searchProducts,
    DeleteProduct
};