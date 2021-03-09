import React, { Component } from "react";
class Welcome extends Component {
    render() {
        return (
            <div ><h1>Welcome to JISS</h1></div>
        );
    }
}
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username:'',password:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        //console.log('Submitting'); //For Debug
        alert('A username was submitted: ' + this.state.username);
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <Welcome />
                <form onSubmit={this.handleSubmit}>
                    <h3>Please Sign In</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" onChange={this.handleChange} className="form-control" placeholder="Enter Username" />
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                    </div>
                    {/*
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>*/}

                    <button type="submit"  className="btn btn-primary btn-block">Submit</button>
                    {/*<p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
            </p>*/}
                </form>
            </div>
        );
    }
}