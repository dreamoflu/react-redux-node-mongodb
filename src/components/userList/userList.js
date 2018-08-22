import  React, { Component } from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import PropsTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
@withRouter
class Userlist extends Component{
    static PropsTypes={
        userList: PropsTypes.array.isRequired
    };
    handleChat(v){
       this.props.history.push(`/chat/${v._id}`)
    }
    render(){
        return(
            <WingBlank>
                <WhiteSpace size="lg" />
                {
                    this.props.userList.map((item)=> (
                        item.avatar?(

                            <Card onClick={this.handleChat.bind(this,item)} full key={item._id}>
                                <Card.Header
                                    title={item.title}
                                    thumbStyle={{width:'50px',height:'50px'}}
                                    thumb={require(`../../common/img/${item.avatar}.jpg`)}
                                    extra={<span>{item.title}</span>}
                                />
                                <Card.Body>
                                    <div>
                                        {
                                            item.desc?(item.desc.split('\n').map((v,i)=>(<div key={i}>{v}</div>))):null
                                        }
                                    </div>
                                </Card.Body>
                                <Card.Footer content="所在公司" extra={<div>{item.company}</div>}/>
                            </Card>
                        ):null
                    ))
                }
            </WingBlank>
        )
    }
}

export  default Userlist