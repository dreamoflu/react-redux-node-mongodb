import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { Grid } from 'antd-mobile';
import './avatarSelect.css'




class Avatarselect extends Component{
    static PropsTypes={
        selectAcatar:PropsTypes.func
    }
    constructor(props){
        super(props);
        this.state={
            text:'',
            icon:''
        }
    }


    render(){
        let imgList = 'bggirl,boy,chicken,girl,lastgirl,one,pig,tBoys'.split(',').map(item=>({
            icon:require(`../../common/img/${item}.jpg`),
             text:item

        }));
        // display: inline-block;
        let headerImg = this.state.text?(<div className="imgWrap">
            <span style={{display:'inline-block',height:'50px',lineHeight:'50px'}}>您选择的头像</span>
            <img style={{height:'50px'}} src={this.state.icon} alt=""/>
        </div>):(<div className="imgWrap" >请选择头像</div>)
        return (
            <div>
                {headerImg}
                <Grid onClick={el=>{
                    this.setState(el),
                    this.props.selectAcatar(el)
                }} data={imgList}></Grid>
            </div>

        )
    }
}
export  default Avatarselect