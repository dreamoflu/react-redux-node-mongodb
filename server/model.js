/*
*
* 操作数据库的文件
* */

const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL);
// mongoose.connection.on('connected',function () {
//    console.log('数据库连接成功');
// });
const models = {
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        'avatar':{type:String,require:true},
        'desc':{type:String,require:true},
        'title':{type:String,require:true}, // 职位
        // 如果是boss
        'company':{type:String,require:true},
        'money':{type:String,require:true}
    },
    chat:{
        'chatid':{type:String,require:true},
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'content':{type:String,require:true,default:''},
        'read':{type:Boolean,default:false},
        'create_time':{type:Number,default:new Date().getTime()}
    }

};

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
};

module.exports = {
    getModel:function (name) {
        return mongoose.model(name);
    }
}


