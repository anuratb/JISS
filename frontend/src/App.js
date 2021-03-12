import './App.css';
import React, { Component } from 'react';
import { render } from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Auth from './Auth';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Login from "./components/login.component";

/*
function LoggedInMessage(props) {
  return <h1>Welcome back!</h1>;
}

function GuestMesage(props) {
  return (
    <h1>Welcome to Judiciary Management System</h1>
  );
}

function WelcomeMessage(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) { return <UserGreeting />; } return <GuestGreeting />;
}


function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginMgnt extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };//Initially not loggged in
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) { button = <LogoutButton onClick={this.handleLogoutClick} />; } else { button = <LoginButton onClick={this.handleLoginClick} />; }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}      </div>
    );
  }
}
*/

function App() {
  return (  
    <Router>
      <div className="App">
        <header className="App-header">
          <Login />          
        </header>
      </div>
    </Router>    
  );
}


export default App;
//REf :https://www.positronx.io/build-react-login-sign-up-ui-template-with-bootstrap-4/