const { body, validationResult, matchedData } = require("express-validator");


const validateUpdate = [
    
]

function updateProduct(req, res) {
    const id = req.query.id;

    console.log(id);
    console.log(req.body);

    res.end()
}

module.exports = updateProduct;