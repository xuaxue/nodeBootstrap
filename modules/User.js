var mongoose = require('mongoose')
var UsersSchema = require('../schemas/user') //拿到导出的数据集模块
var User = mongoose.model('user', UsersSchema) // 编译生成Movie 模型
 
module.exports = User