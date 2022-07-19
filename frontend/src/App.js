import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar.js";

/* PAGES */
import Home from "./pages/home/home.js";
import Login from "./pages/login/login.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    )
  }
}
