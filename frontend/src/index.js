import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import Auth from './Auth';
import Navbar from "./components/nvbar.components";
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
        <Route path="/home" ><GuestMessage user="ABCD" /></Route>{/**For testing ProtectedRoute */}
        <Route exact path="/login">{Auth.isLoggedIn() ? <Redirect to="/home"/>:<App />}</Route>
      
    </Switch>
        {/*(!Auth.isLoggedIn()) ? <Redirect to="/login" /> : <Redirect to="/home" />*/}
    </div > 
  </Router >
  ,
  document.getElementById('root')
);
function GuestMessage(props) {
  return (
    <h1>Welcome to Judiciary Management System, {props.user}</h1>
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
