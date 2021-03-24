import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import Auth from './Auth';
import Navbar from "./components/nvbar.components";
import Judge from "./components/judge.component";
import Lawyer from "./components/lawyer.component";
import Registrar from"./components/registrar.component";
import CourtCase from "./components/court_case.component";

import reportWebVitals from './reportWebVitals';
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"
ReactDOM.render(
  <Router>
    <div>
      <Navbar />
      <Switch>
        {/**Later all the routes which need to be protected will be changed to protected routes */}
        <Route exact path="/home" ><GuestMessage user="ABCD" /></Route>{/**For testing ProtectedRoute */}
        <Route exact path="/login">{Auth.isLoggedIn() ? <Redirect to="/home" /> : <App />}</Route>
        <Route exact path="/userType-judge"><Judge name="Judge Name" /></Route>
        <Route exact path="/userType-lawyer"><Lawyer name="Lawyer Name" /></Route>
        <Route exact path="/userType-registrar"><Registrar name="Registrar Name"/></Route>
        <Route exact path="/case-report"><CourtCase/></Route>
      </Switch>
      {/*(!Auth.isLoggedIn()) ? <Redirect to="/login" /> : <Redirect to="/home" />*/}
    </div >
  </Router >
  ,
  document.getElementById('root')
);
function GuestMessage(props) {
  return (
    <div>      
      <h1>Welcome to Judiciary Management System, {props.user}</h1>
    </div>
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
