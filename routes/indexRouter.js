const { Router } = require("express");
const getHomepage = require("../controllers/getHomepage");

const indexRouter = Router();

indexRouter.get("/", getHomepage);

module.exports = indexRouter;