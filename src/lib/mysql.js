const mysql = require('mysql');
const config = require('../config/default');

const pool = mysql.createPool({
    host     : config.database.HOST,
    user     : config.database.USERNAME,
    password : config.database.PASSWORD,
    database : config.database.DATABASE
})

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if(err){
                reject(err)
            }else{
                await connection.query(sql, values, (err, rows) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(rows)
                    }
                })
                connection.release();
            }
        })
    })
}

const users = `create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    avator VARCHAR(100) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
 );`

 const posts = `create table if not exists posts(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     title TEXT(0) NOT NULL,
     content TEXT(0) NOT null,
     md TEXT(0) NOT NULL,
     uid VARCHAR(40) NOT NULL,
     moment VARCHAR(100) NOT NULL,
     comments VARCHAR(200) NOT NULL DEFAULT '0',
     pv VARCHAR(40) NOT NULL DEFAULT '0',
     avator VARCHAR(100) NOT NULL,
     PRIMARY KEY (id)
 );`

 const comment = `create table if not exists comment(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     content TEXT(0) NOT NULL,
     moment VARCHAR(40) NOT NULL,
     postid VARCHAR(40) NOT NULL,
     avator VARCHAR(100) NOT NULL,
     PRIMARY KEY (id)
 );`

 const createTable = sql => {
     return query(sql,[])
 }

 // 建表
createTable(users)
createTable(posts)
createTable(comment)

// 注册用户
const insertData = value => {
    const _sql =  `insert into users set name=?,pass=?,avator=?,moment=?`;
    return query(_sql, value);
} 

// 查找用户
const findUserData = name => {
    let _sql = `select * from users where name="${name}"`;
    return query(_sql);
}

// 通过名字查找用户
const findDataByName = name => {
    let _sql = `select * from users where name="${name}"`;
    return query(_sql);
}

// 查询个人文章分页
const findPostByUserPage = (name, page) => {
    const _sql = `select * from posts where name="${name}" order by id desc limit ${(page-1)*10},10;`;
    return query(_sql, values)
}

// 查询所有文章
const findAllPost = ()=>{
    const _sql = `select * from posts`;
    return query(_sql);
}

// 查询分页文章
const findPostByPage = page => {
    const _sql = `select * from posts limit ${(page-1)*10},10`;
    return query(_sql);
}




module.exports = {
    query,
	createTable,
    insertData,
    findUserData,
    findDataByName,
    findPostByUserPage,
    findAllPost,
    findPostByPage
}