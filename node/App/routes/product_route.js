const express = require("express");
const router = express.Router();

const list = require('../controllers/productlist');

//Get all orders
router.get("/product_list", list.produclist);
module.exports = router;
