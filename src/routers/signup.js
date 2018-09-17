const router = require('koa-router')();
const userModel = require('../lib/mysql.js');
const checkNotLogin = require('../middlewares/check').checkLogin;
const checkLogin = require('../middlewares/check.js').checkLogin;
const md5 = require('md5')
const moment = require('moment');
const fs = require('fs');
const path = require('path');

// 注册页面
router.get('/signup', async (ctx, next) => {
    await checkNotLogin(ctx)
    await ctx.render('signup', {
        session: ctx.session,
    })
})

// post注册
router.post('/signup', async (ctx, next) => {
    const {
        name,
        password,
        repeatpass,
        avator
    } = ctx.request.body;
    let user = {
        name,
        password,
        repeatpass,
        avator
    };
    await userModel.findUserData(user.name)
    .then(async result => {
        if(result.length){
            try{
                throw Error('用户已经存在')
            }catch(error){
                console.log(error);
            }finally{
                ctx.body = {
                    data:1
                }
            }

        }else if(user.password !== user.repeatpass || user.password == ''){
            ctx.body = {
                data:2
            } 
        }else{
            const base64Data = avator.replace(/^data:image\/\w+;bsae64,/,'');
            const dataBuffer = new Buffer(base64Data, 'base64');
            const getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now();
            const upload = await new Promise((resolve, reject) => {
                fs.writeFile('./src/public/images/' + getName + '.jpg', dataBuffer, err => {
                    if(err){
                        throw err;
                        reject(false);
                    };
                    resolve(true);
                });
            });

            if(upload){
                await userModel.insertData([user.name, md5(user.password),getName, moment().format('YYYY-MM-DD HH:mm:ss')])
                .then(res => {
                    // 注册成功
                    ctx.body = {
                        data:3
                    }
                })
            }

        }
    })

})

// 发表文章页

module.exports = router