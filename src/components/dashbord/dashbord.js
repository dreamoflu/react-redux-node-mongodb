import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import   NavLinkBar  from '../navlinkbar/navlinkbar'
import Boss from '../../container/boss/boss'
import Genius from '../../container/genius/genius'
import Userinfo from '../../container/userinfo/userinfo'
import Msg from '../msg/msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux'

@connect(
    state=>state,
   { getMsgList, recvMsg }
)
class Dashbord extends Component{

    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getMsgList();
            this.props.recvMsg()
        }

    };
    render(){

        let { pathname } = this.props.location;
        let user = this.props.user;
        let navList=[
            {
                path:'/boss',
                text:'genius',
                title:'牛人列表',
                icon:'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
                active_icon:'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg',
                component:Boss,
                hide: user.type === 'genius'
            },
            {
                path:'/genius',
                text:'boss',
                title:'boss列表',
                icon:'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg',
                active_icon:'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg',
                hide: user.type === 'boss',
                component:Genius,
            },
            {
                path:'/info',
                text:'消息',
                icon:'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg',
                active_icon:'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg',
                title:'消息列表',
                component:Msg,

            },
            {
                path:'/me',
                text:'我',
                title:'个人中心',
                icon:'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
                active_icon:'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
                component:Userinfo,
            }

        ];
        return (
            <div>
                <div style={{position:'fixed',top:'0',width:'100%',zIndex:'100'}}>
                    <NavBar>{navList.find(v=>v.path === pathname).title}</NavBar>
                </div>

                <div style={{marginBottom:'45px',marginTop:'40px'}}>
                    <Switch>
                        {
                            navList.map((item)=>(
                                <Route path={item.path} component={item.component} key={item.path}></Route>
                            ))
                        }
                    </Switch>

                </div>
                <NavLinkBar data={navList}></NavLinkBar>

            </div>
        )
    }
}
export  default Dashbord