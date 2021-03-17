import React, { Component } from "react";
import Dropdown from "react-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './judge.css';
import {BrowserRouter as Router  }from "react-router-dom";
class SearchById extends Component {
    constructor(props){
        super(props);
        this.state = {ID:""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        alert(this.state.ID+" was Submitted");
    }
    render(){
        return (
            <form onSubmit = {this.handleSubmit}>
                <label>
                    Enter ID:   
                    <input type="text" onChange = {this.handleChange} name ="ID"/>
                </label>
                <input type = "submit" value = "Search"/>
            </form>
        );
    }
}
class SearchByKey extends Component {
    constructor(props){
        super(props);
        this.state = {Keyword:""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        alert(this.state.Keyword+" was Submitted");
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter Keyword:   
                    <input type="text" onChange = {this.handleChange} name ="Keyword"/>
                </label>
                <input type = "submit" value = "Search"/>
            </form>
        );
    }
}
export default class Judge extends Component {
    constructor(props) {
        super(props);
        this.state = {name: props.name,comp:null};         
        this.OnCriteriaChange = this.OnCriteriaChange.bind(this);           
    }
    OnCriteriaChange(event){        
        if(event.target.value==="ById"){            
            this.setState({comp:<SearchById/>});            
        }
        else if(event.target.value==="ByKeyword"){
            this.setState({comp:<SearchByKey/>});
        }
        else{
            this.setState({comp:null});
        }

    }
    render() {
        
        return (
            <Router>
            <div className="Judge">
                <div className="Judge-header">
                    <h1>Welcome, {this.state.name}</h1>
                    <br />  
                    Search Old Case:                    
                    <select className = "Judge-dropdown-header" defaultValue="Option-Select" onChange={this.OnCriteriaChange}>
                        <option value  = "Option-Select" >Select An Option</option>
                        <option value  = "ById" >Search By ID</option>
                        <option value  = "ByKeyword">Search By Keyword</option>
                    </select>
                    {this.state.comp}                    
                </div>
            </div>
            </Router>
        );
    }
}