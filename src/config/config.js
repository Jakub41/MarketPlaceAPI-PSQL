require("dotenv").config();

module.exports = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
    },
    server: {
        port: process.env.PORT,
        url: process.env.API_URL
    }
};
