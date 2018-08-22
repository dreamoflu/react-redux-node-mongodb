import React, { Component } from 'react'

import { NavBar,List, InputItem,TextareaItem,Button} from 'antd-mobile';
import Avatarselect from '../../components/avatarSelect/avatarSelect'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { update } from '../../redux/login.redux'

@connect(
    state=>state.user,
    { update }
)

class Bossinfo extends Component{
    constructor(props){
        super(props);
        this.state={
            avatar:'',  // 头像
            company:'', // 公司名称
            desc:'',  // 描述
            money:'', // 薪资
            title:'' // 职位
        }
    }
    inoutChange(key,val){
        this.setState({
            [key]:val
        })

    };
    selectAcatar(e){
        this.setState({
            avatar:e.text
        })

    }

    render(){
        let pathname =  this.props.location.pathname;
        let redirect = this.props.redirectTo
        return (
            <div>
                {
                    redirect&&pathname!==redirect?<Redirect to={this.props.redirectTo}></Redirect>:null
                }
                <NavBar mode="dark">Boss 完善信息</NavBar>
                <List>
                    <Avatarselect selectAcatar={this.selectAcatar.bind(this)}/>
                    <InputItem onChange={v=>this.inoutChange('title',v)} placeholder="招聘职位" >招聘职位</InputItem>
                    <InputItem onChange={v=>this.inoutChange('company',v)} placeholder="公司名称">公司名称</InputItem>
                    <InputItem onChange={v=>this.inoutChange('money',v)} placeholder="职位薪资" >职位薪资</InputItem>
                    <TextareaItem
                        title="职位要求"
                        placeholder="职位要求"
                        onChange={v=>this.inoutChange('desc',v)}
                        autoHeight
                    />
                </List>
                <Button onClick={()=>this.props.update(this.state)} type='primary'>保存</Button>
            </div>
        )
    }
}
export  default Bossinfo