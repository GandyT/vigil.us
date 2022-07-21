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
            <React.Fragment id="pageWrapper">
                {this.redirect()}
                <div id="pageWrapper">
                    <div id="homeHeading">
                        <div id="homeTitleCont">
                            <div id="homeTitle">vigil.us</div>
                            <div id="homeDesc">utilizing the power of the citizens to end gun violence</div>
                        </div>
                        <div id="homeBtnCont">
                            <button id="homeSignup" className="homeBtn" onClick={() => { this.setState({ redirect: "/signup" }) }}>Signup</button>
                            <button id="homeLogin" className="homeBtn" onClick={() => { this.setState({ redirect: "/login" }) }}>Login</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}