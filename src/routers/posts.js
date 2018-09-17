const router  = require('koa-router')();
const userModel = require('../lib/mysql');
const moment = require('moment');
const checkNOtLogin = require('../middlewares/check').checkNotLogin;
const checkLogin = require('../middlewares/check').checkLogin;
const md = require('markdown-it')();

// 重置到文章页
router.get('/', async(ctx, next) => {
    ctx.redirect('/posts');
} )

// 文章页
router.get('/posts', async(ctx, next) => {
    let res,
    postsLength,
    name = decodeURIComponent(ctx.request.querystring.split('=')[1]);

    if(ctx.request.querystring) {
        console.log('ctx.request.querystring', name);
        await userModel.findDataByName(name)
        .then(result => {
            postsLength = result.length;
        })
        await userModel.findPostByUserPage(name)
        .then(result => {
            res = result;
        })
        await ctx.render('selfPosts', {
            session:ctx.session,
            posts:res,
            postsPageLength:Math.ceil(postsLength / 10)
        })
    }else{
        await userModel.findPostByPage(1)
        .then(result => {
            res = result;
        })
        await userModel.findAllPost()
        .then(result => {
            postsLength = result.length
        })
        await ctx.render('posts',{
            session:ctx.session,
            posts:res,
            postsLength:postsLength,
            postsPageLength:Math.ceil(postsLength / 10)
        })
    }
})

// 首页分页，每次输出10条
router.post('/posts/page', async(ctx, next) => {
    let page = ctx.request.body.page;
    await userModel.findPostByPage(page)
    .then(result => {
        ctx.body = result
    }).catch(()=>{
        ctx.body = 'error'
    })
})

// 个人文章分页，每次输出10条
router.post('/posts/self/page', async(ctx, next) => {
    const data = ctx.request.body;
    await userModel.findPostByUserPage(data.name, data.page)
    .then(result => {
        ctx.body = result
    })
    .catch(()=>{
        ctx.body = 'error'
    })
})

module.exports = router;