import React, { Component } from "react";

import Dropdown from "react-dropdown";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './registrar.css';
import { BrowserRouter as Router } from "react-router-dom";

export default class Registrar extends Component {
    constructor(props) {
        super(props);
        this.state = { name: props.name, comp: null };
    }

    render() {

        return (
            <Router>
                <div className="Registrar">
                    <div className="Registrar-header">
                        <h1>Welcome, {this.state.name}</h1>
                        <br />
                        <br />
                        <form>
                            Add User:
                        <select className="Registrar-dropdown-header" defaultValue="Option-Select" >
                                <option value="Option-Select" >Select An Option</option>
                                <option value="Lawyer" >Lawyer</option>
                                <option value="Judge">Judge</option>
                            </select>
                            <button type="submit" className="btn btn-primary btn-block">Add Selected User</button>
                        </form>
                        <br />
                        <br />
                        <form>
                            Delete User:
                            <select className="Registrar-dropdown-header" defaultValue="Option-Select" >
                                <option value="Option-Select" >Select An Option</option>
                                <option value="Lawyer" >Lawyer</option>
                                <option value="Judge">Judge</option>
                            </select>
                            <button type="submit" className="btn btn-primary btn-block">Add Selected User</button>
                        </form>
                        <br />
                        <br />
                        <button >Entry Case Report:</button>
                        <br />
                        <br />
                        Search free Slots:<br />
                        Enter Day: <DatePicker />
                        <br />
                        <br />
                        <h2>Query Section</h2>
                        <br />
                        { /**
                        *The currently pending court cases
The cases that have been resolved over any given time
The cases that are coming up for hearing on a particular date
The status of any particular case identified by the CIN.

                       */}
                        <form>
                            Enter Case ID to Query:
                            <input type="text" />
                            <button type="submit" className="btn btn-primary btn-block">Add Selected User</button>
                        </form>
                    </div>
                </div>
            </Router>
        );
    }
}