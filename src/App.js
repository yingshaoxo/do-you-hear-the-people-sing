import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Nav } from "react-bootstrap"

import Login from "./components/Login";
import Logup from "./components/Logup";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Gun from 'gun/gun'
var gun = Gun(['http://localhost:8765/gun'])


function Home() {
    return (
        <div className="App-body">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Do you hear the people sing?
            </p>
        </div>
    );
}

function About() {
    return (
        <div className="App-body">
            <p>The author is: <a className="App-link" href="https://yingshaoxo.xyz" target="_blank" rel="noopener noreferrer">yingshaoxo</a></p>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Router>

                <Nav
                    activeKey="/"
                    className="Navigation"
                >
                    <Nav.Item
                        className="Navigation-item"
                    >
                        <Link to="/">Home</Link>
                    </Nav.Item>
                    <Nav.Item
                        className="Navigation-item"
                    >
                        <Link to="/login">Log in</Link>
                    </Nav.Item>
                    <Nav.Item
                        className="Navigation-item"
                    >
                        <Link to="/logup">Log up</Link>
                    </Nav.Item>
                    <Nav.Item
                        className="Navigation-item"
                    >
                        <Link to="/about">About</Link>
                    </Nav.Item>
                </Nav>

                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route
                    exact
                    path='/logup'
                    render={(props) => <Logup {...props} gun={gun} />}
                />
                <Route path="/about" component={About} />
            </Router>
        </div>
    );
}

export default App;
