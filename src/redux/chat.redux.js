
import  axios from 'axios'
import io from 'socket.io-client';
const socket = io('ws://localhost:9000');


const MSG_LIST = 'GETINFO_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';


const ininState={
        chatMsg:[],
        users:[],
        unread:0
};

export  function chat(state=ininState, action){
    switch (action.type){
        case MSG_LIST:
            return { ...state,chatMsg:action.payload.msgs,users:action.payload.users,unread: action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userid).length};
        case MSG_RECV:
            let n = action.userid === action.payload.to?1:0
            return {...state,chatMsg:[...state.chatMsg,action.payload],unread:state.unread+n};
        case MSG_READ:
            const { from, num } = action.payload
            return {...state,chatMsg:state.chatMsg.map(v=>({ ...v,read:from == v.from?true:false })),unread:state.unread - num }    
        default:
            return state
    }
};






function msgList(msgs, users,userid) {
    return { type:MSG_LIST,payload:{msgs,users,userid} }
};
function msgRecv(data,userid) {
    return {userid, type:MSG_RECV,payload:data }
}
export function recvMsg() {
    return (dispatch,getState)=>{
        socket.on('recvmsg',function (data) {
            console.log('recvmsg',data);
            const userid = getState().user._id
            dispatch(msgRecv(data,userid))
        })
    }
}
function msgRead({ from, userid, num }){
  return { type:MSG_READ, payload:{ from, userid, num } }
}
export function readMsg(from){
  return (dispatch,getState)=>{
      axios.post('/user/readmsg',{from}).then(res=>{
          const userid = getState().user._id;
          if (res.status == 200 && res.data.code ==0) {
             dispatch(msgRead({ userid, from, num:res.data.num }))
          }
      })
  }
};
export function sendMsg({ from, to, msg }) {
    return dispatch=>(
        socket.emit('sendmsg',{ from, to, msg })
    )

}
export function getMsgList(chatid) {
    return (dispatch,getState)=>(
        axios.get(`/user/getmsglist?chatid=${chatid}`).then((result)=>{
            if(result.status===200&&result.data.code===0){
                console.log('getState',getState())
                const userid = getState().user._id
                dispatch(msgList(result.data.msgs,result.data.users,userid))
            }

        })
    )
}