const router = require('koa-router')();
const controller = require('../controller/signup-controller');

// 注册页面
router.get('/signup', controller.getSignUp);

// post注册
router.post('/signup', controller.postSignUp);

// 发表文章页

module.exports = router