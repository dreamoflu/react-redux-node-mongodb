import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getUserList } from '../../redux/chatuser.redux'
import Userlist from '../../components/userList/userList'

@withRouter
@connect(
    state=>state.chatuser,
    { getUserList }
)
class Boss extends Component{

    componentDidMount(){
   this.props.getUserList('genius')
    }



    render(){
        return (
            <div>
                <Userlist userList = {this.props.userList}/>
                {/*<WhiteSpace size="lg" />*/}
                {/*{*/}
                    {/*this.props.userList.map((item)=> (*/}
                        {/*item.avatar?(*/}
                            {/*<Card full key={item._id}>*/}
                                {/*<Card.Header*/}
                                    {/*title={item.title}*/}
                                    {/*thumbStyle={{width:'50px',height:'50px'}}*/}
                                    {/*thumb={require(`../../common/img/${item.avatar}.jpg`)}*/}
                                    {/*extra={<span>{item.title}</span>}*/}
                                {/*/>*/}
                                {/*<Card.Body>*/}
                                    {/*<div>*/}
                                        {/*{*/}
                                            {/*item.desc?(item.desc.split('\n').map((v,i)=>(<div key={i}>{v}</div>))):null*/}
                                        {/*}*/}
                                    {/*</div>*/}
                                {/*</Card.Body>*/}
                                {/*<Card.Footer content="所在公司" extra={<div>{item.company}</div>}/>*/}
                            {/*</Card>*/}
                        {/*):null*/}


                    {/*))*/}
                {/*}*/}

            </div>
        )
    }
}
export  default Boss