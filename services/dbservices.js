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

/**
 * 
 * @param {خواندن کانفیگ} name 
 * @returns 
 */
exports.get_config = async(name)=>{
    try{
        return await this.exec_query('select * from configs where name=:name',{ name : name });
    }
    catch(e){
        console.log(e);
        return null;
    }
};

/**
 * لیست مارکت ها
 * @returns
 */
exports.get_markets_async = async () => {
    return await this.exec_query(`select * from markets`);
};

exports.get_markets = (call_back) => {
    //this.exec_query(`select * from markets`);

    try{
        pool.query(`select * from markets`,(err,res,meta)=>{
            //console.log(err,res,meta);
            call_back(err,res,meta);
        });
    }
    catch(e){
        console.log(e);
    }
};

