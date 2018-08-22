import React, { Component } from 'react'
import { List, InputItem, NavBar } from 'antd-mobile'
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../common/js/util'


@connect(
    state=>state,
    { sendMsg, getMsgList,recvMsg, readMsg }

)
class Chat extends  Component{
    constructor(props){
        super(props);
        this.state={
            text:'',
            msg:[]
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
       
    };
   componentWillUnmount(){
    let to = this.props.match.params.user;
    this.props.readMsg(to)
   }
    onChangeInput(v){
        this.setState({
            text:v
        })
    };
    setMymsg(){
        let from = this.props.user._id;
        let to = this.props.match.params.user;
        let msg = this.state.text;
        this.props.sendMsg({ from, to, msg });
        this.setState({
            text:''
        })
    };
    render(){
        let userid = this.props.match.params.user;
        let Item = List.Item;
        let users = this.props.chat.users;
        let chatId = getChatId(userid,this.props.user._id)
        let chatMsg = this.props.chat.chatMsg.filter(v=>v.chatid===chatId)
        

        if(!users[userid]){
            return null
        }
        return(
            <div>
                <NavBar mode='dark' style={{position:'fixed',top:'0',width:'100%'}}>
                    {this.props.chat.users[userid].name}
                </NavBar>
                <div style={{paddingBottom:'40px',paddingTop:'40px'}}>
                    {chatMsg.map((item,index)=> {
                        // console.log(item.from)
                        const avatar = require(`../../common/img/${users[item.from].avatar}.jpg`);

                       return item.from === userid ? (

                            <List key={item._id}>
                                <Item
                                    thumb={avatar}
                                >{item.content}</Item>
                            </List>
                        ) : (
                            <List key={index}>
                                <Item
                                    className='chatMsgRight'
                                    extra={<img src={avatar} alt=""/>}
                                >
                                    {item.content}
                                </Item>
                            </List>
                        )

                    })}
                </div>


                <div style={{position:'fixed',bottom:'0',width:'100%',zIndex:'100'}}>
                    <List>
                        <InputItem
                            value={this.state.text}
                            onChange={v=>this.onChangeInput(v)}
                            placeholder="请输入内容"
                            extra={<span onClick={this.setMymsg.bind(this)}>发送</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>

        )
    }
}

export default  Chat