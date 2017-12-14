var express = require('express');
var router = express.Router();
var User = require('../modules/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/userset', function(req, res, next) {
  res.send('userset');
});


//查询所有用户数据
router.get("/load",function(req,res,next){
    User.fetch(function(err, users) {
        console.log(users);
        if(err) {
            console.log(err);
        }        
        res.render('user',{title: '用户列表',users: users[0]})  //这里也可以json的格式直接返回数据res.json({data: users});
    });
});

router.get("/register",function(req,res,next){
    res.render('user/register',{title: '注册'})
});
router.get("/login",function(req,res,next){
    res.render('user/login',{title: '登录'})
});

module.exports = router;
