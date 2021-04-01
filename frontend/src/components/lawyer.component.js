import React, { Component } from "react";
import Dropdown from "react-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './lawyer.css';
import LogoutButton from "./logoutbutton"
import CourtCase from "./court_case.component"
import DispCIN from './dispCIN.component'
import axios from 'axios';
import {
    useHistory,
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";


class SearchById extends Component {
    constructor(props) {
        super(props);
        this.state = { ID: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        alert(this.state.ID + " was Submitted");
        const requestOptions = {
            'cin': this.state.ID,
        };
        axios.post('/api/searchbyId', requestOptions)
            .then(res => {
                console.log(res.data);
                this.props.handleviewCase(res.data.case_details);
            });


    }
    render() {
        return (
            <Router>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter ID:
                    <input type="text" onChange={this.handleChange} name="ID" />
                    </label>
                    <input type="submit" value="Search" />
                </form>
            </Router>
        );
    }
}
class SearchByKey extends Component {
    constructor(props) {
        super(props);
        this.state = { Keyword: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        alert(this.state.Keyword + " was Submitted");
        const requestOptions = {
            'key': this.state.Keyword,
        };
        axios.post('/api/searchbyKey', requestOptions)
            .then(res => {
                console.log(res.data);
                this.props.handleviewCaseId(res.data.cin_list);
            });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter Keyword:
                    <input type="text" onChange={this.handleChange} name="Keyword" />
                </label>
                <input type="submit" value="Search" />
            </form>
        );
    }
}
class Lawyer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            comp: null, 
            curr_casedata: null, 
            searchrecv_id: false,             
            searchrecv_Key:false,
            curr_caseIdList:[]
        };
        this.OnCriteriaChange = this.OnCriteriaChange.bind(this);
        this.handleviewCase = this.handleviewCase.bind(this);
        this.handleviewCaseId = this.handleviewCaseId.bind(this);
        this.goback = this.goback.bind(this);
        this.handleviewreqCase = this.handleviewreqCase.bind(this);
    }
    handleviewreqCase(props)
    {
        console.log(props);
        alert("Searching for"+props.data.cin);
        const requestOptions = {
            'cin': props.data.cin,
        };
        axios.post('/api/searchbyId', requestOptions)
            .then(res => {
                console.log(res.data);
                this.handleviewCase(res.data.case_details);
            });
    }
    goback() {
        if(this.state.searchrecv_Key)
        {
            if(this.state.searchrecv_id)
            {
                this.setState({searchrecv_id: false});
            }
            else
            {
                this.setState({searchrecv_Key:false});
            }
        }
        else
        {
            this.setState({searchrecv_id:false});
        }
        
    }
    OnCriteriaChange(event) {
        if (event.target.value === "ById") {
            this.setState({ comp: <SearchById handleviewCase={this.handleviewCase} /> });
        }
        else if (event.target.value === "ByKeyword") {
            this.setState({ comp: <SearchByKey handleviewCaseId={this.handleviewCaseId} /> });
        }
        else {
            this.setState({ comp: null });
        }

    }
    
    handleviewCase(props) {
        this.setState({ searchrecv_id: true, curr_casedata: props });
        //console.log(this.state.curr_casedata);
    }
    handleviewCaseId(props) {
        /**
         * props : List of all {'cin':'<CIN>','crime_type':'<CRIME_TYPE>'}
         */
        this.setState({  curr_caseIdList: props ,searchrecv_Key: true,});
        console.log('Handle View Case Lawyer: ',this.state.curr_caseIdList);
    }
    render() {
        
        if (this.state.searchrecv_id) {            
            return (<CourtCase case_data={this.state.curr_casedata} goback={this.goback} />);
        }
        else if (this.state.searchrecv_Key)
        {
            return (<DispCIN cin_list={this.state.curr_caseIdList} handleselect = {this.handleviewreqCase} goback ={this.goback}/>);
        }
        return (
            <Router>

                <div className="Lawyer">
                    <div className="Lawyer-header">
                        <h1>Welcome, {this.state.name}</h1>
                        <br />
                    Search Old Case:
                    <select className="Lawyer-dropdown-header" defaultValue="Option-Select" onChange={this.OnCriteriaChange}>
                            <option value="Option-Select" >Select An Option</option>
                            <option value="ById" >Search By ID</option>
                            <option value="ByKeyword">Search By Keyword</option>
                        </select>
                        {this.state.comp}

                        <LogoutButton handlelogout={this.props.handlelogout} />
                    </div>
                </div>
            </Router>
        );
    }
}
export default Lawyer;