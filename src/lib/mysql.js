const mysql = require('mysql');
const config = require('../config/default');


const insertData = value => {
    const _sql =  `insert into users set name=?,pass=?,avator=?,moment=?`;
    return query(_sql, value);
} 

const pool = mysql.createPool({
    host     : config.database.HOST,
    user     : config.database.USERNAME,
    password : config.database.PASSWORD,
    database : config.database.DATABASE
})

const query = (sql, values) => {
console.log(111);
}