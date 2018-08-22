import React, { Component } from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom'

import './App.css';
import Login from './container/login/login';
import Register from './container/register/register'
import  Islogin  from './components/isLogin/isLogin'

import Bossinfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashbord from './components/dashbord/dashbord'
import Chat from './components/chat/chat'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Islogin/>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/bossinfo' component={Bossinfo}/>
                    <Route path='/geniusinfo' component={Geniusinfo}/>
                    <Route path='/chat/:user' component={Chat}/>
                    <Route  component={Dashbord}/>
                </Switch>
            </div>
        </BrowserRouter>

    );
  }
}

export default App;
