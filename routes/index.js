var express = require('express');
var router = express.Router();
var User = require('../modules/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/indexset', function(req, res, next) {
  res.send('userset');
});

//查询所有用户数据
router.get("/load",function(req,res,next){
    User.fetch(function(err, users) {
        console.log(users);
        if(err) {
            console.log(err);
        }        
        res.render('user',{title: '用户列表'});  //这里也可以json的格式直接返回数据res.json({data: users});
    });
});
//退出登录
router.get('/quit', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//post请求
router.post('/login', function(req, res, next) {
    //console.log(req);
    if(!req.body.name){
        console.log("no name");
    }
    if(!req.body.pwd){
        console.log("no password");
    }
    User.findByName(req.body.name,req.body.pwd,function(err, users){
        console.log(users);
        if(err) {
            console.log(err);
        }  
        if(users.length){
            res.render('user',{title: '成功了', users: users[0]});//这里也可以json的格式直接返回数据res.json({data: users});
        }else{
            res.render('user',{title: '失败了'});
        }
    });
});

router.post('/regist', function(req, res, next) {
    //console.log(req);
    if(!req.body.name){
        console.log("no name");
    }
    if(!req.body.pwd){
        console.log("no pwd");
    }
    User.findByName(req.body.name,req.body.pwd,function(err,user){
      if(err){
        res.render('error',{error:err});
      }else if(user.length){
        console.log("用户名已经存在");
        res.render('user/register');
        return;
      }else{
        User.create(req.body.name,req.body.pwd,function(err, result){
          console.log(result);
          console.log("注册返回");
          if(err) {
              console.log(err);
              alert(err);
          }  
          if(result.ok){
              res.render('index');//这里也可以json的格式直接返回数据res.json({data: users});
          }else{
              res.render('error',{title: '失败了'});
          }
        });
      }
    });
});
module.exports = router;
