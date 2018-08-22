import  React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button,List, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { login } from '../../redux/login.redux'
import  Logo  from '../../components/logo/logo'
import hocFrom from '../../components/hoc-from/hocfrom'


@connect(
    state=>state.user,
    { login }
)
@hocFrom
class Login extends Component{
    // constructor(props){
    //     super(props);
    //     // this.state={
    //     //     user:'',
    //     //     pwd:'',
    //     // }
    // };
    // onHandleChange(key,value){
    //     this.setState({
    //         [key]:value
    //     })
    // };
    onLoginSuccess(){

        this.props.login(this.props.state);

    }

    render(){
        return(
            <div>
                {
                    this.props.redirectTo&& this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}></Redirect>:null
                }
                <Logo></Logo>
                <div style={{color:'red'}}>{this.props.user.msg}</div>
                <List style={{paddingTop:"20px"}}>
                    <InputItem type="text" onChange={v=>this.props.onHandleChange('user',v)} placeholder="186 1234 1234">手机号码</InputItem>
                    <InputItem type="password" onChange={v=>this.props.onHandleChange('pwd',v)}  placeholder="****">密码</InputItem>
                </List>
                <div style={{paddingTop:'40px'}}>
                    <Button type="primary" onClick={this.onLoginSuccess.bind(this)}>登录</Button>
                    <Button style={{marginTop:'20px'}} onClick={()=>this.props.history.push('/register')} type="primary">注册</Button>
                </div>
            </div>


        )
    }
}
export  default Login