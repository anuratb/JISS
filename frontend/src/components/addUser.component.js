import React, { Component } from "react";
import GridLayout from 'react-grid-layout';

import Dropdown from "react-dropdown";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './registrar.css';
import { BrowserRouter as Router } from "react-router-dom";
import LogoutButton from "./logoutbutton"

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            password :'',
            usr_type :'',
            usr_addr :''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit()
    {

    }
    handleChange(e)
    {
        this.setState({[e.target.name]:e.target.value});
    }
    render() {
        return (
            <Router>
                <div className="Registrar">
                    <div className="Registrar-header">
                        <form onSubmit={this.handleSubmit}>
                            <h3>Add User</h3>

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" onChange={this.handleChange} className="form-control" placeholder="EnterName" />
                            </div>
                            <div className="form-group">
                                <label>User Type:</label>
                                <label>                                    
                                    <select className="form-control" defaultValue="None" name="usr_type" onChange={this.handleChange}>
                                        <option value="None">Select User Type</option>
                                        <option value="Lawyer">Lawyer</option>
                                        <option value="Judge">Judge</option>                                        
                                    </select>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>User Address</label>
                                <input type="text" name="usr_addr" onChange={this.handleChange} className="form-control" placeholder="EnterUserAddr" />
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" name="username" onChange={this.handleChange} className="form-control" placeholder="EnterUsername" />
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" onChange={this.handleChange} className="form-control" placeholder="EnterPassword" />
                            </div>
                            <div className="form-group">                                
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Router>
        );
    }
}