import React from "react";
import { Navigate } from "react-router-dom";
import "../../App.css";
import "./home.css";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: ""
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
                    <div id="homeHeading">
                        <div id="homeSignup" className="homeBtn" onClick={() => { this.setState({ redirect: "/signup" }) }}>Signup</div>
                        <div id="homeLogin" className="homeBtn" onClick={() => { this.setState({ redirect: "/login" }) }}>Login</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}