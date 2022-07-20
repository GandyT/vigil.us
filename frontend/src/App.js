import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar.js";

/* PAGES */
import Home from "./pages/home/home.js";
import Login from "./pages/login/login.js";
import Signup from "./pages/signup/signup.js";
import Profile from "./pages/profile/profile.js";

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    )
  }
}
