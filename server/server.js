/*
*
* 入口文件
*
* */
const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const  app = express();
const model = require('./model');

const Chat = model.getModel('chat');

// http 和 io 关联
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection',function (socket) {
    console.log('socket 连接成功')
    socket.on('sendmsg',function (data) {
        const { from, to, msg } = data;
        const chatid = [from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg},function (err,doc) {
           io.emit('recvmsg',Object.assign({},doc._doc))
        })


    })
})

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user',userRouter); //开启中间件

http.listen(9000,()=>{
    console.log('node success')
});

// app.use('/userinfo',userRouter); //开启中间件  '/userinfo' 相当于路由前缀

// 访问user时 路径 http://localhost:9000/info