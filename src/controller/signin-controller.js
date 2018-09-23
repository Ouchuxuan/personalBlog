const userModel = require('../model/mysql');
const moment = require('moment');
const checkNotLogin = require('../middlewares/check').checkNotLogin;
const checkLogin = require('../middlewares/check').checkLogin;
const md = require('markdown-it')();
const md5 = require('md5')

exports.getSignin = async ctx => {
    await checkNotLogin(ctx)
    await ctx.render('signin', {
        session: ctx.session,
    })
}

exports.postSignin = async ctx => {
    const name = ctx.request.body.name;
    const password = ctx.request.body.password;
    await userModel.findDataByName(name)
    .then(result => {
        if(name === result[0]['name'] && md5(password) === result[0]['pass']){
            ctx.body = true;
            ctx.session.user = result[0]['name'];
            ctx.session.id = result[0]['id'];
            console.log('ctx.session.id', ctx.session.id)
            console.log('session', ctx.session)
            console.log('登录成功')
        }else{
            ctx.body = false;
            console.log('用户名密码错误！');
        }
    }).catch(error=>{
        console.log(error);
    })
}