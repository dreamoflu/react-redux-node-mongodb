import React, { Component } from 'React'
export default  function hocFrom(Comp) {
    return class wrappFrom extends Component{
        constructor(props){
            super(props);
            this.state={};
            this.onHandleChange= this.onHandleChange.bind(this)
        };
        onHandleChange(key,value){
            this.setState({
                [key]:value
            })
        }
        render(){
            return(
                <Comp onHandleChange={this.onHandleChange} {...this.props} state={this.state}/>
            )
        }
    }
}