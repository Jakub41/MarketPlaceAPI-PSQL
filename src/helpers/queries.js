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
                        VALUES (${createValuesIds(params)})
                        RETURNING*`,
            params
        );
    },

    deleteOne(table, column, param) {
        return query(
            `DElETE FROM ${table}
                WHERE ${column} = $1 returning *`,
            [param]
        );
    }
};

// Return a comma delimited $n for each element in the params array
// Calling it with something like createValuesIds(['a','b','c','d','e','f']) returns $1, $2, $3, $4, $5, $6
const createValuesIds = vals => {
    let ids = "";
    for (let i = 0; i < vals.length; i++) {
        ids += i === 0 ? "$1" : `, $${i + 1}`;
    }
    return ids;
};

module.exports = { Queries };
