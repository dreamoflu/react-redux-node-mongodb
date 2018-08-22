import React,{ Component } from 'react'
import { connect } from 'react-redux'

import { List, Badge } from 'antd-mobile'

@connect(
    state=>state
)
class Msg extends Component{
    //获取消息最后一条
     getLastMsg(arr){
         return arr[arr.length-1]
     }

     
    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        let chatMsgGroup={};
        this.props.chat.chatMsg.map((item)=>{
            chatMsgGroup[item.chatid]=chatMsgGroup[item.chatid]||[];
            chatMsgGroup[item.chatid].push(item)
          
        })
        const chatList = Object.values(chatMsgGroup).sort((a,b)=>{
            const a_last = this.getLastMsg(a).create_time;
            const b_last = this.getLastMsg(b).create_time;
            return b_last-a_last
        });
        console.log(chatList)
        const userList = this.props.chat.users;
        const userid = this.props.user._id;
        
        

        return(
            <div>
                {
                  chatList.map(item=>{
                      const lastmsg = this.getLastMsg(item)
                      const tatgetId = item[0].from===userid?item[0].to:item[0].from;
                      const name = userList[tatgetId]?userList[tatgetId].name:'';
                      const avatar = userList[tatgetId]?userList[tatgetId].avatar:'';
                      const unreadNum = item.filter(v=>!v.read&&v.to==userid).length;
                      return(
                        <List key={lastmsg._id} >
                          <Item thumb={ require(`../../common/img/${avatar}.jpg`) } 
                            arrow="horizontal"
                            extra={<Badge text={unreadNum}></Badge>}
                            onClick={()=>{
                                this.props.history.push(`/chat/${tatgetId}`)
                            }}
                          >
                           {lastmsg.content}
                           <Brief>{name}{unreadNum}</Brief>
                          </Item>
                        </List> 
                      ) 
                })

                }
            </div>
            
        )
    }
}
export default Msg