import  React, { Component } from 'react'
import { Button,List, InputItem, Radio } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../redux/login.redux';
import  Logo  from '../../components/logo/logo'
import hocFrom from '../../components/hoc-from/hocfrom'


const RadioItem = Radio.RadioItem;

@connect(
    state=>state.user,
    {register}
)
@hocFrom
class Login extends Component{

    // constructor(props){
    //     super(props);
    //    // this.state={
    //    //      user:'',
    //    //      pwd:'',
    //    //     repeatpwd:'',
    //    //     type:'boss'
    //    // }
    // };
    // onHandle (key,value) {
    //   this.setState({
    //       [key]:value
    //   })
    //
    // };
    onSelectRadio (value) {
        this.setState({
            type:value
        })
    };
    onHandleRegister(){
        this.props.register(this.props.state);

    };
    componentDidMount() {
        this.props.onHandleChange('type', 'boss');
    };

    render(){
        const data = [
            { value: 'boss', label: '我是老板' },
            { value: 'genius', label: '我是大牛' },
        ];
        return(
            <div>
                <Logo></Logo>
                {
                    this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null
                }
                {this.props.msg?<p style={{color:'red',marginTop:'10px'}}>{this.props.msg}</p>:''}
                <List style={{paddingTop:"20px"}}>
                    <InputItem type="text" onChange={v=>this.props.onHandleChange('user',v)}  placeholder="请输入手机号" >手机号码</InputItem>
                    <InputItem type="password" onChange={v=>this.props.onHandleChange('pwd',v)} placeholder="请输入密码" >密码</InputItem>
                    <InputItem type="password" onChange={v=>this.props.onHandleChange('repeatpwd',v)}  placeholder="请确认密码" >确认密码</InputItem>
                    {data.map(item => (
                        <RadioItem key={item.value} checked={this.props.state.type === item.value} onChange={this.onSelectRadio.bind(this,item.value)}>
                            {item.label}
                        </RadioItem>
                    ))}


                    <Button style={{marginTop:"40px"}} onClick={this.onHandleRegister.bind(this)} type="primary">注册</Button>
                </List>
            </div>


        )
    }
}
export  default Login