import './App.css';
import React, { Component } from 'react';
import { render } from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Auth from './Auth';
import Navbar from "./components/nvbar.components";
import axios from 'axios';
import Judge from "./components/judge.component";
import Lawyer from "./components/lawyer.component";
import Registrar from "./components/registrar.component";
import CourtCase from "./components/court_case.component";
import Home from "./components/home";

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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { logged_in: "No",usr_type: "None" };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogin(props)
  {
    console.log("Hi");
    if(props.login_status=="1")
    {
      this.setState({logged_in : "Yes",usr_type: props.user_type});
    }  
  }
  handleLogout(e)
  {
    console.log("Handing Logout");
    axios.post("/api/logout",{withCredentials:true})
    .then(res=>{
      if(res.data.logout_status=="1")
      {
        this.setState({logged_in :"No",usr_type : "None"});
      }
      
    })
    //TODO Error handling aboove
    
    
  }
  //fetch("/api/account").then(res => res.json()).then(res => { console.log(res); });
  //axios.post('api/logout',null)
  LoggedIn() {
    axios.get("/api/isLoggedIn", { withCredentials: true })
      .then(res => {
        if (this.state.logged_in == "No" & res.data.login_status == '1') {
          this.setState({ logged_in: "Yes",usr_type: res.data.user_type });
        }
        else if (this.state.logged_in == "Yes" & res.data.login_status == '0') {
          this.setState({ login: "No",usr_type: "None" });
        }

      });
  }
  componentDidMount()
  {
    this.LoggedIn();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar LoginStatus = {this.logged_in} handleLogout = {this.handleLogout}/>
          <header >

            <Switch>
              {/**Later all the routes which need to be protected will be changed to protected routes */}
              <Route exact path="/home" ><Home user="ABCD" isLoggedIn={this.state.logged_in} handlelogout={this.handleLogout} /></Route>{/**For testing ProtectedRoute */}
              <Route exact path="/login">{this.state.logged_in == "Yes" ? <Redirect to="/home" /> : <Login handlelogin={this.handleLogin} />}</Route>
              <Route exact path="/userType-judge"><Judge name="Judge Name" /></Route>
              <Route exact path="/userType-lawyer"><Lawyer name="Lawyer Name" /></Route>
              <Route exact path="/userType-registrar"><Registrar name="Registrar Name" /></Route>
              <Route exact path="/case-report"><CourtCase /></Route>
            </Switch>
          </header>
        </div>
      </Router >
    );
  }
}



export default App;
//REf :https://www.positronx.io/build-react-login-sign-up-ui-template-with-bootstrap-4/