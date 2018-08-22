import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropsTypes from 'prop-types'
import  { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import './navlinkbar.css'

@withRouter
@connect(
    state=>state
)
class NavLinkBar extends Component{
    static PropsTypes={
        data:PropsTypes.array.isRequire,
    }


    render(){
        let { pathname } = this.props.location;
        let navList = this.props.data.filter(v=>!v.hide);
        console.log(navList);
        return (
            <div className="tabbarwrap">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                  >
                    {
                        navList.map((item)=>(
                            <TabBar.Item
                                badge={item.path==='/info'?this.props.chat.unread:0}
                                title={item.text}
                                key={item.title}
                                icon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${item.icon}) center center /  21px 21px no-repeat` }}
                                />
                                }
                                selectedIcon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${item.active_icon}) center center /  21px 21px                                              no-repeat` }}

                                />
                                }
                                selected={ pathname === item.path }
                                data-seed="logId"
                                onPress={()=>{
                                    this.props.history.push(item.path)
                                }}
                            >
                            </TabBar.Item>
                        ))

                    }



                </TabBar>

            </div>
        )
    }
}
export  default NavLinkBar