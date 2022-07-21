import React from "react";
import "../../App.css";
import "../login/login.css";
import "./signup.css"
import * as Axios from "axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            signup: false,
        }
    }

    onChange = e => {
        let cur = e.target.value;

        this.setState({ email: cur });
    }

    signup = async () => {
        let sign = await Axios.post("api/signup", { email: this.state.email });
        if (!sign.data.success) {
            // handle error
            return;
        }

        this.setState({ signup: true });
    }

    renderNotice = () => {
        if (this.state.signup) {
            return (
                <div id="signupNotice">
                    <div id="signupSuccess">Success!</div>
                    <div id="signupInstructions">Please check your email and click on the link to verify your token. Then, login with your token.</div>
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    <div id="loginCont">
                        <div id="loginTitle">Signup</div>
                        <div id="loginHolder">
                            <input id="loginInput" placeholder="Email" onChange={this.onChange} />
                            <button id="loginInputBtn" onClick={this.signup}>Signup</button>
                            <div id="loginInputMessage">we do not save your email address</div>
                        </div>
                    </div>
                </React.Fragment >
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <div id="pageWrapper">
                    {this.renderNotice()}
                </div>
            </React.Fragment>
        )
    }
}