const userModel = require('../model/mysql');
const moment = require('moment');
const checkNOtLogin = require('../middlewares/check').checkNotLogin;
const checkLogin = require('../middlewares/check').checkLogin;
const md = require('markdown-it')();

// 重置到文章页
exports.getRedirectPosts = async ctx => {
    ctx.redirect('/posts');
}
// 文章页
exports.getPosts = async ctx => {
    let res,
        postsLength,
        name = decodeURIComponent(ctx.request.querystring.split('=')[1]);


    if (ctx.request.querystring) {
        await userModel.findDataByName(name)
            .then(result => {
                postsLength = result.length;

            })
        await userModel.findPostByUserPage(name, 1)
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
}

// 首页分页，每次输出10条
exports.postPostsPage = async ctx => {
    let page = ctx.request.body.page;
    await userModel.findPostByPage(page)
        .then(result => {
            ctx.body = result
        }).catch(() => {
            ctx.body = 'error'
        })
}

// 个人文章分页，每次输出10条
exports.postSelfPage = async ctx => {
    const data = ctx.request.body;
    await userModel.findPostByUserPage(data.name, data.page)
        .then(result => {
            ctx.body = result
        })
        .catch(() => {
            ctx.body = 'error'
        })
}

// get发表文章页面
exports.getCreate = async ctx => {
    await ctx.render('create', {
        session: ctx.session
    })
}
// post发表文章
exports.postCreate = async ctx => {
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
}

// 单篇文章页
exports.getSinglePosts = async ctx => {
    let comment_res,
        res,
        pageOne,
        res_pv,
        statCount;
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
    await userModel.getStarCount(ctx.params.postId)
        .then(result => {
            statCount = result[0]['star'];
        })
    await ctx.render('sPost', {
        session: ctx.session,
        posts: res[0],
        commentLength: comment_res.length,
        commentPageLength: Math.ceil(comment_res.length / 10),
        pageOne,
        statCount
    })
}

// 发表评论
exports.postComment = async ctx => {
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

}

//评论分页
exports.postCommentPage = async ctx => {
    let postId = ctx.params.postId,
        page = ctx.request.page;
    await userModel.findCommentByPage(page, postId)
        .then(result => {
            ctx.body = result
        }).catch(error => {
            ctx.body = error
        })
}

// 删除评论
exports.postDeleteComment = async ctx => {
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
}

// 删除单篇文章
exports.postDeletePost = async ctx => {
    let postId = ctx.params.postId;
    await userModel.deleteAllPostComment(postId);
    await userModel.deletePost(postId)
        .then(() => {
            ctx.body = {
                data: 1
            }
        })
        .catch(error => {
            ctx.body = {
                data: 2
            }
        })
}

// get 编辑单篇文章页面
exports.getEditPage = async ctx => {
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
}

// post 编辑单篇文章
exports.postEditPage = async ctx => {
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
            } [target]
        }),
        newContent = content.replace(/[<">']/g, (target) => {
            return {
                '<': '&lt;',
                '"': '&quot;',
                '>': '&gt;',
                "'": '&#39;'
            } [target]
        });
    await userModel.updatePost([newTitle, md.render(content), content, postId])
        .then(() => {
            ctx.body = true
        }).catch(() => {
            ctx.body = false
        })
}

// 点赞
exports.postStar = async ctx => {
    // 获取用户名
    const userName = ctx.request.body.name;
    // 获取文章点赞数并加1，然后更新文章点赞数
    let currentStarCount,
        starStatus,
        time = moment().format('YYYY-MM-DD HH:mm:ss');
    await userModel.getStarCount(ctx.params.postId)
        .then(result => {
            currentStarCount = result[0]['star'];
        })
    // 从表star中查询该用户在该文章中的点赞情况
    await userModel.getStarStatus(userName, ctx.params.postId)
        .then(async result => {
            console.log(result);
            const resLength = result.length;
            starStatus = result[resLength-1]['status'];
            if (starStatus === '0') {
                //点赞数+1
                currentStarCount += 1;
                // 写入star表
                await userModel.postStar([time, ctx.params.postId, userName, '1']);
            } else {
                currentStarCount -= 1;
                // 写入star表
                await userModel.postStar([time, ctx.params.postId, userName, '0']);
            }
        })
    // 更新posts表
    await userModel.updateStarCount(ctx.params.postId, currentStarCount)
        .then(() => {
            ctx.body = {
                type: 1,
                data: parseInt(currentStarCount)
            }
        })
        .catch(error => {
            ctx.body = 0
        })
}