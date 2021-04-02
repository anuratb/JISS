import React, { Component } from "react";
import GridLayout from 'react-grid-layout';

import Dropdown from "react-dropdown";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './registrar.css';
import { BrowserRouter as Router } from "react-router-dom";
import LogoutButton from "./logoutbutton"
import AddUser from "./addUser.component";
import RemoveUser from "./removeUser.component";
export default class Registrar extends Component {
    constructor(props) {
        super(props);
        this.state = { name: props.name, comp: null, selected_usecase: "None" };
        this.OnCriteriaChange = this.OnCriteriaChange.bind(this);
        this.goback = this.goback.bind(this);
    }
    goback()
    {
        this.setState({selected_usecase:"None"});
    }
    OnCriteriaChange(event) {
        this.setState({ selected_usecase: event.target.value });
    }
    render() {
        if (this.state.selected_usecase != "None") {
            if (this.state.selected_usecase == "AddUser") {
                return (<AddUser goback={this.goback}/>);
            }
            else if (this.state.selected_usecase == "RemoveUser") {
                return (<RemoveUser goback={this.goback}/>);
            }
            else if (this.state.selected_usecase == "ViewFreeSlots") {

            }
            else if (this.state.selected_usecase == "ViewPendingCases") {

            }
            else if (this.state.selected_usecase == "ViewResolvedCases") {

            }
            else if (this.state.selected_usecase == "ViewUpcomingCasesByDate") {

            }

        }
        else {
            return (
                <Router>
                    <div className="Registrar">
                        <div className="Registrar-header">
                            <p> Welcome , {this.state.name}</p>
                            <select className="Registrar-dropdown-header" defaultValue="None" onChange={this.OnCriteriaChange}>
                                <option value="None" >Select An Option</option>
                                <option value="AddUser" >Add User</option>
                                <option value="RemoveUser">Remove User</option>
                                <option value="ViewFreeSlots">View Free Slots</option>
                                <option value="ViewPendingCases">View Pending Cases</option>
                                <option value="ViewResolvedCases">View Resolved Cases</option>
                                <option value="ViewUpcomingCasesByDate">View Upcoming Cases On a Date</option>
                            </select>
                            <p />
                            <LogoutButton handlelogout={this.props.handlelogout} />
                        </div>
                    </div>
                    
                </Router>
            );
        }

    }
}