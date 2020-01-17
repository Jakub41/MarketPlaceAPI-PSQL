const { query } = require("../db/dbConnect");

const Queries = {
    findAll(table) {
        return query(`SELECT * FROM ${table}`);
    },

    findOne(table, id, params) {
        return query(`SELECT * FROM ${table} where ${id} = $1`, [params]);
    },

    insertOne(table, values, params) {
        const arr1 = [...values];
        const arr2 = [params];
        return query(
            `INSERT INTO ${table}
                        (${arr1})
                        VALUES ($1, $2, $3, $4, $5, $6)
                        RETURNING*`, [arr2]
        );
    }
};

module.exports = { Queries };
