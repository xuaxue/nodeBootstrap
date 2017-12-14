var mongoose = require('mongoose');

//申明一个mongoons对象
var UsersSchema = new mongoose.Schema({
    name: String,
    pwd: String
});

//每次执行都会调用,时间更新操作
/**/

//查询的静态方法
UsersSchema.statics = {
    fetch: function(cb) { //查询所有数据
        return this
          .find()
          //.sort('meta.updateAt') //排序
          .exec(cb); //回调
    },
    findById: function(id, cb) { //根据id查询单条数据
        return this
          .findOne({_id: id})          
          .exec(cb);
    },
    findByName:function(name,password,cb){
        //console.log("data:"+name+","+password);
        return this.find({
            name:name,
            pwd:password
        }).exec(cb);
    },
    create:function(name,password,cb){
        //console.log(name+",,"+password);
        this.update({
            name:name,
            pwd:password
        }).exec(cb);
    }
}

//暴露出去的方法
module.exports = UsersSchema