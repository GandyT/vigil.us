import React from "react";
import { Navigate } from "react-router-dom";
import "../../App.css";
import "./home.css";
import shooterData from "../../resource/shooters.js";
import Fade from 'react-reveal/Fade';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from "faker";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Mass Shootings since 1982',
        },
    },
};

const labels = [];
let tags = {}
let s = 1982;
let e = 2022;
for (let i = s; i <= e; ++i) {
    labels.push(String(i));
    tags[String(i)] = 0;
}

shooterData.forEach(shooter => {
    tags[shooter.year]++;
})

const data = {
    labels,
    datasets: [
        {
            label: 'Shootings',
            data: labels.map((label) => tags[label]),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

const datasetFrom = "https://www.kaggle.com/datasets/zusmani/us-mass-shootings-last-50-years";

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

    renderPastShooters = () => {
        let shooters = [];

        shooterData.forEach((shooter, i) => {
            shooters.push(
                <Fade key={i} >
                    <div className="shooterCard" onClick={() => {
                        window.open(shooter.source, "_blank")
                    }}>
                        <div className="shooterCardTitle">
                            {shooter.case}
                        </div>
                        <div className="shooterCardProp">
                            location: {shooter.location}, deaths: {shooter.deaths}
                        </div>
                        <div className="shooterCardProp">
                            shooter age: {shooter.shooterAge}
                        </div>
                        <div className="shooterCardProp">
                            prior-signs: {shooter.priorSigns == "-" ? "None" : shooter.mentalHealth}
                        </div>
                        <div className="shooterCardProp">
                            {shooter.type} Murder - {shooter.year}
                        </div>
                    </div>
                </Fade>
            )
        })

        return shooters;
    }

    render() {
        return (
            <React.Fragment>
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
                    <div id="pastShooters">
                        <div id="pastShootersDesc">
                            <div id="graphWrapper">
                                <Line options={options} data={data} />
                            </div>
                            <div id="shooterDescWrapper">
                                It is evident from the data that in the past years, the number of mass shootings have only been increasing with a dip due to the pandemic.
                                With data from <a href={datasetFrom}>Kaggle</a>, a good number of mass shooters <b>showed signs</b> to the people around them and were flagged
                                before they commited such crimes. Current reporting methods involve calling numbers and <b>outdated websites</b> that make it extremely
                                unappealing to report even simple suspicions such as posts on the internet. vigil.us aims to bridge the gap between the citizens and
                                law enforcement and uses <b>AI</b> to analyze suspicious behavior in an attempt to prevent mass shootings in the future.
                            </div>
                        </div>
                        <div id="pastShootersCont">
                            {this.renderPastShooters()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}