const router = require('koa-router')();
const userModel = require('../lib/mysql');
const moment = require('moment');
const checkNOtLogin = require('../middlewares/check').checkNotLogin;
const checkLogin = require('../middlewares/check').checkLogin;
const md = require('markdown-it')();

// 重置到文章页
router.get('/', async (ctx, next) => {
    ctx.redirect('/posts');
})

// 文章页
router.get('/posts', async (ctx, next) => {

    let res,
        postsLength,
        name = decodeURIComponent(ctx.request.querystring.split('=')[1]);

    if (ctx.request.querystring) {
        console.log('ctx.request.querystring', name);
        console.log(1);
        await userModel.findDataByName(name)
            .then(result => {
                postsLength = result.length;
            })
        console.log(2);
        await userModel.findPostByUserPage(name)
            .then(result => {
                res = result;
            })
        await ctx.render('selfPosts', {
            session: ctx.session,
            posts: res,
            postsPageLength: Math.ceil(postsLength / 10)
        })
    } else {
        await userModel.findPostByPage(1)
            .then(result => {
                res = result;
            })
        await userModel.findAllPost()
            .then(result => {
                postsLength = result.length
            })
        await ctx.render('posts', {
            session: ctx.session,
            posts: res,
            postsLength: postsLength,
            postsPageLength: Math.ceil(postsLength / 10)
        })
    }
})

// 首页分页，每次输出10条
router.post('/posts/page', async (ctx, next) => {
    let page = ctx.request.body.page;
    await userModel.findPostByPage(page)
        .then(result => {
            ctx.body = result
        }).catch(() => {
            ctx.body = 'error'
        })
})

// 个人文章分页，每次输出10条
router.post('/posts/self/page', async (ctx, next) => {
    const data = ctx.request.body;
    await userModel.findPostByUserPage(data.name, data.page)
        .then(result => {
            ctx.body = result
        })
        .catch(() => {
            ctx.body = 'error'
        })
})

// 发表文章页面
router.get('/create', async (ctx, next) => {
    await ctx.render('create', {
        session: ctx.session
    })
})

// post发表文章
router.post('/create', async (ctx, next) => {
    let title = ctx.request.body.title,
        content = ctx.request.body.content,
        id = ctx.session.id,
        name = ctx.session.user,
        time = moment().format('YYYY-MM-DD HH:mm:ss'),
        avator,
        // 现在使用markdown不需要单独转义
        newContent = content.replace(/[<">']/g, (target) => {
            return {
                '<': '&lt;',
                '"': '&quot;',
                '>': '&gt;',
                "'": '&#39;'
            } [target]
        }),
        newTitle = title.replace(/[<">']/g, (target) => {
            return {
                '<': '&lt;',
                '"': '&quot;',
                '>': '&gt;',
                "'": '&#39;'
            } [target]
        });
    // 查找头像
    await userModel.findUserData(ctx.session.user)
        .then(res => {
            console.log(res[0]['avator']);
            avator = res[0]['avator'];
        })
    // 插入文章
    await userModel.insertPost([name, newTitle, md.render(content), content, id, time, avator])
        .then(() => {
            ctx.body = true;
        })
        .catch(() => {
            ctx.body = false;
        })




})

// 单篇文章页
router.get('/posts/:postId', async (ctx, next) => {
    let comment_res,
        res,
        pageOne,
        res_pv;
    await userModel.findDataById(ctx.params.postId)
        .then(result => {
            res = result;
            res_pv = parseInt(result[0]['pv']);
            res_pv += 1;
        });

    await userModel.updatePostPv([res_pv, ctx.params.postId]);
    await userModel.findCommentByPage(1, ctx.params.postId)
        .then(result => {
            pageOne = result;
        });
    await userModel.findCommentById(ctx.params.postId)
        .then(result => {
            comment_res = result;
        })

    await ctx.render('sPost', {
        session: ctx.session,
        posts: res[0],
        commentLength: comment_res.length,
        commentPageLength: Math.ceil(comment_res.length / 10),
        pageOne

    })

})

// 发表评论
router.post('/:postId', async (ctx, next) => {
    let name = ctx.session.user,
        content = ctx.request.body.content,
        postId = ctx.params.postId,
        res_comments,
        time = moment().format('YYYY-MM-DD HH:mm:ss'),
        avator;

    await userModel.findUserData(ctx.session.user)
        .then(res => {
            avator = res[0]['avator'];
        })

    await userModel.insertComment([name, md.render(content), time, postId, avator]);

    await userModel.findDataById(postId)
        .then(result => {
            res_comments = parseInt(result[0]['comments']);
            res_comments += 1;

        });

    await userModel.updatePostComment([res_comments, postId])
        .then(() => {
            ctx.body = true
        }).catch((error) => {
            ctx.body = error
        })


})

//评论分页
router.post('/posts/:postId/commentPage', async (ctx, next) => {
    let postId = ctx.params.postId,
        page = ctx.request.page;
    await userModel.findCommentByPage(page, postId)
        .then(result => {
            ctx.body = result
        }).catch(error => {
            ctx.body = error
        })
})

// 删除评论
router.post('/posts/:postId/comment/:commentId/remove', async (ctx, next) => {
    let postId = ctx.params.postId,
        commentId = ctx.params.commentId,
        res_comments;
    await userModel.findDataById(postId)
        .then(result => {
            res_comments = parseInt(result[0]['comments']);
            res_comments = -1;
        })

    await userModel.updatePostComment([res_comments, postId]);

    await userModel.deleteComment(commentId)
        .then(() => {
            ctx.body = {
                data: 1
            }
        }).catch(() => {
            ctx.body = {
                data: 2
            }
        })
})

// 删除单篇文章
router.post('posts/:postId/remove', async (ctx, next) => {
    let postId = ctx.params.postId;
    await userModel.deleteAllPostComment(postId);
    await userModel.delete_post(postId)
        .then(() => {
            ctx.body = {
                data: 1
            }.catch(() => {
                ctx.body = {
                    data: 2
                }
            })
        })
})

// 编辑单篇文章页面
router.get('/posts/:postId/edit', async(ctx,next)=>{
    let name = ctx.session.user,
    postId = ctx.params.postId,
    res;
    await userModel.findDataById(postId)
    .then(result => {
        res = result;
    })

    await ctx.render('edit', {
        session: ctx.session,
        postsContent: res.md,
        postsTitle: res.title
    })
})

// post 编辑单篇文章
router.post('/posts/:postId/edit', async(ctx, next) => {
    let title = ctx.request.body.title,
        content = ctx.request.body.content,
        id = ctx.session.id,
        postId = ctx.params.postId,
         // 现在使用markdown不需要单独转义
        newTitle = title.replace(/[<">']/g, (target) => {
            return {
                '<': '&lt;',
                '"': '&quot;',
                '>': '&gt;',
                "'": '&#39;'
            }[target]
        }),
        newContent = content.replace(/[<">']/g, (target) => {
            return {
                '<': '&lt;',
                '"': '&quot;',
                '>': '&gt;',
                "'": '&#39;'
            }[target]
        });
    await userModel.updatePost([newTitle, md.render(content), content, postId])
        .then(() => {
            ctx.body = true
        }).catch(() => {
            ctx.body = false
        })
})


module.exports = router;