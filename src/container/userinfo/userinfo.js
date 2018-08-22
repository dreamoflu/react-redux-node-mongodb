import  React, { Component } from 'react'
import { WhiteSpace, Result, List, Button, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import cookies from 'browser-cookies'
import { LoginOut } from "../../redux/login.redux";
import { Redirect } from 'react-router-dom'



@connect(
    state=>state.user,
    { LoginOut }
)
class Userinfo extends Component{
    componentDidMount(){
      console.log(this.props)
    };
    loginOut(){
        const alert = Modal.alert;
        alert('注销', '确定退出登录???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                cookies.erase('userid');
                this.props.LoginOut()
                } },
        ])

    }
    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        return(

            <div>
                {
                    this.props.user?(
                        <div>
                            <Result
                                img={<img style={{width:'50px',height:'50px'}} src={require(`../../common/img/${this.props.avatar}.jpg`)}/>}
                                title={this.props.user}
                                message={this.props.type=='boss'?this.props.company:null}
                            />
                            <WhiteSpace/>

                            <List>

                                <Item>
                                    {this.props.title}



                                    {
                                        this.props.desc.split('\n').map((item)=>(
                                            <Brief key={item}>{item}</Brief>
                                        ))
                                    }
                                    {
                                        this.props.money?(<Brief >{this.props.money}</Brief>):null
                                    }

                                </Item>
                            </List>

                            <WhiteSpace/>
                            <Button type="default"  onClick={()=>this.loginOut()}>退出登录</Button>

                        </div>


                    ):<Redirect to={this.props.redirectTo}></Redirect>
                }


            </div>


        )
    }
}
export  default Userinfo