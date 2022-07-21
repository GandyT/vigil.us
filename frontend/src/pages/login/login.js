import React from "react";
import { Navigate } from "react-router-dom";
import SessionManager from "../../SessionManager.js";
import "../../App.css";
import "./login.css";
import * as Axios from "axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            redirect: ""
        }
    }

    onChange = e => {
        let cur = e.target.value;

        if (cur.length > 12) return;

        this.setState({ token: cur });
    }

    login = async () => {
        // verify token
        let tokenExists = await Axios.post("api/tokenexists", { token: this.state.token });
        if (tokenExists.data.success) {
            if (tokenExists.data.exists) {
                SessionManager.SetToken(this.state.token);
                this.setState({ redirect: "/profile" })
            }
        }
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
                    <div id="loginCont">
                        <div id="loginTitle">Login</div>
                        <div id="loginHolder">
                            <input id="loginInput" placeholder="Input Token" onChange={this.onChange} />
                            <button id="loginInputBtn" onClick={this.login}>Login</button>
                            <div id="loginInputMessage">input your 12 digit token</div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}