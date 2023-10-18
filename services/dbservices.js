const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASENAME,
    connectionLimit: 5,
    multipleStatements: false,
    namedPlaceholders: true,
    bigNumberStrings: true,
    supportBigNumbers: true,
    bigIntAsNumber: true,
    decimalAsNumber: true,
    bigIntAsNumber: true
});

/**
 * اجرای کوئری
 * @param {any} query_content
 * @param {any} query_params
 * @returns
 */
exports.exec_query = async (query_content, query_params) => {
    try {
        return await pool.query(query_content, query_params);
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

/**
 * لود کوئری
 * @param {any} query_url
 * @returns
 */
exports.get_query = async (query_url) => {
    try {
        return await this.exec_query(`select query_content from queries where url = :query_url`, { query_url: query_url });
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

