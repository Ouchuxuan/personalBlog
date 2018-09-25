const mysql = require('mysql');
const config = require('../config/default');

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if (err) {
                reject(err)
            } else {
                await connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
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
     star INT(32) NOT NULL DEFAULT '0',
     PRIMARY KEY (id)
 );
 `

const comment = `create table if not exists comment(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     content TEXT(0) NOT NULL,
     moment VARCHAR(40) NOT NULL,
     postid VARCHAR(40) NOT NULL,
     avator VARCHAR(100) NOT NULL,
     PRIMARY KEY (id)
 );`

const stars = `create table if not exists star(
    id INT NOT NULL AUTO_INCREMENT,
    moment VARCHAR(40) NOT NULL,
    postid VARCHAR(40) NOT NULL,
    username VARCHAR(40) NOT NULL,
    status VARCHAR(8) NOT NULL,
    PRIMARY KEY (id)
 );`

const createTable = sql => {
    return query(sql, [])
}

// 建表
createTable(users)
createTable(posts)
createTable(comment)
createTable(stars)

// 注册用户
const insertData = value => {
    const _sql = `insert into users set name=?,pass=?,avator=?,moment=?`;
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
    return query(_sql)
}

// 查询所有文章
const findAllPost = () => {
    const _sql = `select * from posts`;
    return query(_sql);
}

// 通过文章id查找
const findDataById = id => {
    const _sql = `select * from posts where id="${id}"`;
    return query(_sql);
}

// 查询分页文章
const findPostByPage = page => {
    const _sql = `select * from posts limit ${(page-1)*10},10`;
    return query(_sql);
}
// 发表文章
const insertPost = value => {
    const _sql = `insert into posts set name=?,title=?,content=?,md=?,uid=?,moment=?,avator=?`;
    return query(_sql, value);
}

// 更新修改文章
let updatePost = function (values) {
    let _sql = `update posts set  title=?,content=?,md=? where id=?`
    return query(_sql, values)
}
// 更新文章浏览数
const updatePostPv = value => {
    const _sql = `update posts set pv=? where id=?`;
    return query(_sql, value);
}
// 评论分页
const findCommentByPage = (page, postId) => {
    const _sql = `select * from comment where postid=${postId} order by id desc limit ${(page-1)*10},10;`;
    return query(_sql);
}

//通过评论id查找
const findCommentById = id => {
    const _sql = `select * from comment where postid="${id}"`;
    return query(_sql);
}

// 发表评论
const insertComment = value => {
    const _sql = `insert into comment set name =?, content =?,moment=?,postid=?,avator=?;`;
    return query(_sql, value);

}

// 更新文章评论数
const updatePostComment = value => {
    const _sql = `update posts set comments=? where id=?`;
    return query(_sql, value);
}

// 删除评论
const deleteComment = id => {
    const _sql = `delete from comment where id=${id}`;
    return query(_sql);
}

// 删除所有评论
const deleteAllPostComment = id => {
    const _sql = `delete from comment where postid = ${id}`;
    return query(_sql);
}

// 查找评论数
const findCommentLength = id => {
    const _sql = `select * from comment where postid in(select id form posts where id=${id});`;
    return query(_sql);
}


// 滚动加载无限数据
const findPageById = page => {
    const _sql = `select * from posts limit ${(page-1)*5},5`;
    return query(_sql);
}

// 删除文章
const deletePost = id => {
    const _sql = `delete from posts where id = ${id}`
    return query(_sql)
}

//获取文章点赞数
const getStarCount = id => {
    const _sql = `select star from posts where id=${id};`;
    return query(_sql);
}
// 点赞
const postStar = value => {
    const _sql = `insert  into 'star' set moment = ?, postid =?, username=?, status = ?`;
    return query(_sql);
}

// 更新文章点赞数
const updateStarCount = (id, value) => {
    const _sql = `update posts set star=${value} where id=${id};`;
    return query(_sql)
}





module.exports = {
    query,
    createTable,
    insertData,
    findUserData,
    findDataByName,
    findPostByUserPage,
    findAllPost,
    findPostByPage,
    insertPost,
    findDataById,
    updatePostPv,
    findCommentByPage,
    findCommentById,
    insertComment,
    updatePostComment,
    deleteComment,
    deleteAllPostComment,
    findCommentLength,
    findPageById,
    updatePost,
    deletePost,
    getStarCount,
    postStar,
    updateStarCount
}