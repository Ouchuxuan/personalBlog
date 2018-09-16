const router = require('koa-router')();
const userModel = require('../lib/mysql.js');
const md5 = require('md5')
const moment = require('moment');
const fs = require('fs')

// 注册页面
router.get('/signup', async(ctx, next) => {
    // await ctx.render('signup', {
    //     session: ctx.session,
    // })
    console.log(4444444);
})

module.exports = router