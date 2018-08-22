import { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from "../../redux/login.redux";


@withRouter
@connect(
    state=>state.user,
    { loadData }
)
class Islogin extends Component{
    componentDidMount () {
        axios('/user/info').then((result)=>{

            let data = result.data;
            if(result.status === 200) {
                if(data.code === 0){
                    this.props.loadData(data.data);

                }else{
                    this.props.history.push('/login');
                }

            }

        })
    }
    render(){
        return null
    }
}
export  default Islogin