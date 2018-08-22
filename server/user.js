const express = require('express');
const utils = require('utility');
const Router = express.Router(); //express 中间件 可以把文件分割


const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');

//查询聊天内容
Router.get('/getmsglist',function (req,res) {
    // Chat.remove({},function () {
    
    // })
    const user = req.cookies.userid;
    console.log(user)
    User.find({},function (e,userdoc) {
       let users={}
        userdoc.forEach(v=>{
            users[v._id] = {name:v.user,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]},function (err,doc) {
            return res.json({code:0,msgs:doc,users:users})
        })
    });



});


Router.get('/list',function (req,res) {
    // Userinfo.remove({},function (err,doc) {
    //     return res.json(doc)
    //
    // })

    // get 获取参数
    let { type } = req.query;
    User.find({'type':type},{pwd:0},function (err,doc) {
        return res.json({code:0,data:doc})
        
    })
});
Router.post('/readmsg',function(req, res){
    const userid = req.cookies.userid
    const { from } = req.body;
    console.log(userid, from)
    Chat.update({ from, to:userid },
        {'$set':{read:true}},
        {'multi':true},
        function(err,doc){
        console.log(doc)
        if(!err){
            return res.json({code:0, num:doc.nModified})
        } else {
            return res.json({code:1,msg:'修改失败'})
        }
    })

})
// 完善信息接口
Router.post('/update',function (req,res) {
    const  userid = req.cookies.userid;
    if(!userid) {
        return res.json({code:-9998})
    }
    // return json.jumps({code:-9998})
    let params = req.body;
    User.findByIdAndUpdate(userid,params,function (err,doc) {
        if(err){
            return res.json({code:-9998,msg:'后台出错了'})
        }

            let data = Object.assign({}, {
                user:doc.user,
                type:doc.type
            },params
            );
        return res.json({code:0,data})

    })

    // 第一查询条件  第二个不返回数据的条件
    // Userinfo.findOne({userinfo:userinfo,pwd:pwd},{pwd:0},function (err,doc) {
    //     if(doc){
    //
    //         res.cookie('userid',doc._id);
    //         return res.json({data:doc,code:0,msg:''})
    //     }else{
    //         return res.json({code:-9998,msg:'账户名或密码错误'})
    //     }
    //
    // })
});

// 注册接口
Router.post('/register',function (req,res) {
    const { user, pwd, type } = req.body;
    User.findOne({user:user},function (err,doc) {
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        };
        const userModel = new User({user, pwd, type});
        userModel.save(function (e,d) {
           if(e){
               return res.json({code:-9998,msg:`后端出错了`})
           }
           const {user, type,_id} = d;
           res.cookie('userid',_id);
            return res.json({code:0,msg:'',data:{user,type,_id}})
        });

        // Userinfo.create({userinfo, pwd, type},function (err,doc) {
        //
        //     if(err){
        //         return res.json({code:-9998,msg:`后端出错了`})
        //     }else{
        //         res.cookie('userid',doc._id);
        //         return res.json({code:0,msg:''})
        //     }
        // })
    })
});
//登录接口
Router.post('/login',function (req,res) {
    let {user,pwd} = req.body;
    if(!user||!pwd){
        return res.json({code:-9998,msg:'用户名或密码为空'})
    };
    // 第一查询条件  第二个不返回数据的条件
    User.findOne({user:user,pwd:pwd},{pwd:0},function (err,doc) {
        if(doc){

            res.cookie('userid',doc._id);
            return res.json({data:doc,code:0,msg:''})
        }else{
            return res.json({code:-9998,msg:'账户名或密码错误'})
        }

    })
});


Router.get('/info',function (req,res) {
    let { userid } = req.cookies;
    if(!userid){
        return res.json({code:1,msg:''})
    }
    User.findOne({_id:userid},{pwd:0,_v:0},function (err,doc) {
        if(err){
            return res.json({code:1,msg:'后端出错了'});
        }else{
            return res.json({code:0,msg:'',data:doc._doc});
        }
    })

});
// 密码加密
function md5pwd (pwd){
    let salt="myMd5Pwd_nodejs_@12^%&(^%$&&**()";
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router;