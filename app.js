require('dotenv').config();

const path = require("node:path");
const express = require("express");
const indexRouter = require("./routes/indexRouter");
const productsRouter = require("./routes/productsRouter")
const app = express();

const PORT = process.env.PORT;

const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/products", productsRouter)

app.listen(PORT, () => {
    console.log(`App is running on localhost:${PORT}`);
});