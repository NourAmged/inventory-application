require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 33 ),
    category VARCHAR (15),
    price DECIMAL(5, 2), 
    quantity INTEGER,
    description VARCHAR(255),
    image TEXT DEFAULT '../images/fork-and-knife-with-plate-svgrepo-com.svg' 
);

INSERT INTO products (name, category, price, quantity, description, image)
VALUES
    ('Bread', 'Bakery', 1.50, 50, 'Freshly baked bread', '../images/bread-svgrepo-com.svg'),
    ('Cheese', 'Dairy', 1.99, 20, 'Delicious cheddar cheese, perfect for sandwiches or melting', '../images/cheese-svgrepo-com.svg'),
    ('Apple', 'Fruits', 0.99, 100, 'A crisp and juicy red apple, perfect for snacking or adding to salads.', '../images/apple-svgrepo-com.svg');
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:${process.env.PORT_DB}/inventory`,
    });

    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("done !!!");

}

main();