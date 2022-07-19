import React from "react";
import { Navigate } from "react-router-dom";
import SessionManager from "../../SessionManager.js";
import "../../App.css";
import "../login/login.css";
import * as Axios from "axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            redirect: ""
        }
    }

    onChange = e => {
        let cur = e.target.value;

        this.setState({ email: cur });
    }

    signup = async () => {

    }

    redirect = () => {
        if (this.state.redirect)
            return <Navigate to={this.state.redirect} />
    }

    render() {
        return (
            <React.Fragment>
                {this.redirect()}
                <div id="pageWrapper">
                    <div id="loginTitle">Signup</div>
                    <div id="loginHolder">
                        <input id="loginInput" placeholder="Email" onChange={this.onChange} />
                        <button id="loginInputBtn">Signup</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}