const { Queries } = require("../helpers/queries");
const { query } = require("../db/dbConnect");

const Product = {
    async readAll(req, res) {
        try {
            const products = await Queries.findAll("products");
            if (products.rowCount === 0)
                return res.status(404).json({
                    msg: "No records from DB"
                });
            res.send(products.rows);
        } catch (err) {
            return res.json({ msg: "Error getting from DB", err: err });
        }
    },

    async getOne(req, res) {
        try {
            const product = await Queries.findOne("products", "_id", req.params.id);

            if (product.rowCount === 0)
                return res.status(404).json({
                    msg: "Product not found",
                    product: req.params.id
                });
            res.send(product.rows);
        } catch (errr) {
            return res.json({
                msg: "Error getting one product from DB",
                err: err
            });
        }
    },

    async createOne(req, res) {
        console.log({ ...req.body });
        try {
            const product = await query(
                `INSERT INTO products
                    (productname, description, brand, price, category, imageurl)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING*`,
                [
                    req.body.productname,
                    req.body.description,
                    req.body.brand,
                    req.body.price,
                    req.body.category,
                    req.body.imageurl
                ]
            );
            res.json({ msg: "Product added", data: product.rows });
        } catch (err) {
            return res.json({ msg: "POST Something went wrong!", err: err });
        }
    },

    async updateOne(req, res) {
        try {
            const findOneProduct = await query(
                `SELECT * FROM products where _id = $1`,
                [req.params.id]
            );
            if (findOneProduct.rowCount === 0)
                return res.status(404).json({
                    msg: "Product not found",
                    product: req.params.id
                });

            const update = await query(
                `UPDATE products
                SET productname = $1, description = $2, brand = $3, price = $4, category = $5, imageurl = $6, updated_at = $7
                WHERE _id=$8 returning *`,
                [
                    req.body.productname,
                    req.body.description,
                    req.body.brand,
                    req.body.price,
                    req.body.category,
                    req.body.imageurl,
                    new Date(),
                    req.params.id
                ]
            );
            res.json({ msg: "Product updated", data: update.rows });
        } catch (err) {
            return res.json({ msg: "PUT Something went wrong!", err: err });
        }
    },

    async deleteOne(req, res) {
        try {
            const findOneProduct = await query(
                `SELECT * FROM products where _id = $1`,
                [req.params.id]
            );
            if (findOneProduct.rowCount === 0)
                return res.status(404).json({
                    msg: "Product not found",
                    product: req.params.id
                });

            await query(
                `DElETE FROM products
                    WHERE _id=$1 returning *`,
                [req.params.id]
            );
            res.json({ msg: "Product deleted", data: req.params.id });
        } catch (err) {
            return res.json({ msg: "PUT Something went wrong!", err: err });
        }
    }
};

module.exports = Product;
