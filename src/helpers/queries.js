const { query } = require("../db/dbConnect");

const Queries = {
    findAll(table) {
        return query(`SELECT * FROM ${table}`);
    },

    findOne(table, id, params) {
        return query(`SELECT * FROM ${table} where ${id} = $1`, [params]);
    },

    insertOne(table, columns, params) {
        return query(
            `INSERT INTO ${table}
                        (${columns})
                        VALUES ($1, $2, $3, $4, $5, $6)
                        RETURNING*`,
            params
        );
    }
};

module.exports = { Queries };
