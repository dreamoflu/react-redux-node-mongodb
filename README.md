
```js
nodemon  --node调试使用，能监听文件修改，刷新服务;
使用mongoose插件操作数据库;

body-parse 插件 用来接收post参数，node 用
 mongod --config /usr/local/etc/mongod.conf  启动mongoDB
 mongo 可以查看MongoDB 是否安装成功和启动成功

 MD5 加密 第三方库  utility
 prop-types prop 验证
const cookieParser = require('cookie-parser'); nodejs 操作cookie
browser-cookies 前台操作cookie 库


npm install socket.io --save 服务端使用的库
npm install socket.io-client --save  客户端使用库

注意：================
action.creat 必须返回一个object 或者函数
例如
function authSucess(userinfo) {
    return {type:AUTH_SUCCESS,payload:userinfo}

    或者
    return dispatch=>{

    }
}
react 优化  seamless-immutable(库比较小)/immutablejs（库比较大） 创建不可更改不可变数据  一般用在定制shouldComponentUpdata中比较复杂数据类型 

redux 优化reselect 

key 循环时根据key的变化，确定数据是否发生变化，dom是否要重新渲染 不推荐使用索引值index


react 动画  ReactCssTransitionGroup或者 Ant Motion(motion.ant.design)





 brew services start mongodb  ---启动
 brew services stop mongodb --停止
 brew services restart mongodb --重启

 或者
 mongod --config /usr/local/etc/mongod.conf --启动

 use admin, db.shutdownServer() --关闭

```


