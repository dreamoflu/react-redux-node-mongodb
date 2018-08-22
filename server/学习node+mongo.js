const express = require('express');
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017';
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function () {
    console.log('数据库连接成功');
});

const User = mongoose.model('user',new mongoose.Schema({
    user:{type:String,require:true},
    age:{type:Number,require:true}
}));
// Userinfo.create({
//     userinfo:'小花',
//     age:10
// },(err,doc)=>{
//     if(err){
//         console.log(err)
//     }else {
//         console.log(doc)
//     }
// })
User.remove({age:18},(err,doc)=>{
    console.log(doc)
});
User.update({'user':'小花'},{'$set':{age:21}},function (err,doc) {
    console.log(doc)
})

const  app = express();
app.get('/',(req,res)=>{
    res.send(`<h1>Hello Word</h1>`)
});
app.get('/data',(req,res)=>{
    User.find({},(err,doc)=>{
        res.json(doc)
    })
});
app.listen(9000,()=>{
    console.log('node success')
})