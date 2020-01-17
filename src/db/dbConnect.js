const { db } = require("../config/config");
const { Pool } = require("pg");

const pool = new Pool({
    user: db.user,
    host: db.host,
    database: db.name,
    password: db.pass,
    port: db.port
});

pool.on("connect", () => {
    console.log(">> Connected to the db");
});

const query = (txt, params) => {
    return new Promise((resolve, reject) => {
        pool.query(txt, params)
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
};

module.exports = { query };
