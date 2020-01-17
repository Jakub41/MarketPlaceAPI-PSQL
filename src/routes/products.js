const express = require("express");
const { Product } = require("../models/index.models");
const router = express.Router();

router.get("/", Product.readAll);
router.get("/:id", Product.getOne);
router.post("/", Product.createOne);
router.put("/:id", Product.updateOne);

module.exports = router;
