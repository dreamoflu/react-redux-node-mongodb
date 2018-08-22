import React, { Component } from 'react'
import logoImg from './logo.svg';

class Logo extends Component{
    render(){
        return(
            <header className="App-header">
                <img src={logoImg} className="App-logo" alt="logo" />
            </header>
        )
    }
}

export default Logo