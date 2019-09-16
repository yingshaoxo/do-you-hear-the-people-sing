import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

import { Nav, DropdownButton, Dropdown } from "react-bootstrap"

import Login from "./components/Login";
import Logup from "./components/Logup";
import Home from "./components/Home";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Gun from 'gun/gun'
require('gun/sea') // matters if you want to use gun.user()
var gun = Gun(['http://localhost:8765/gun'])
var user = gun.user()

class Logout extends Component {
    constructor(props) {
        super(props);

        window.localStorage.setItem("username", "")
        window.localStorage.setItem("password", "")
        user.leave()

        this.props.set_state({
            loggedIn: false
        })

        setTimeout(() => {
            window.location = "/"
        }, 3000)
    }

    render() {
        return (
            <div className="App-body">
                <p>
                    Bye Bye!
                </p>
            </div>
        );
    }
}

function About() {
    return (
        <div className="App-body">
            <p>The author is: <a className="App-link" href="https://yingshaoxo.xyz" target="_blank" rel="noopener noreferrer">yingshaoxo</a></p>
        </div>
    );
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
        }
    }

    get_state = () => {
        return this.state
    }

    set_state = (new_state) => {
        this.setState(new_state)
    }

    auto_login_if_possible = () => {
        var username = window.localStorage.getItem("username")
        var password = window.localStorage.getItem("password")

        if ((username == null) && (password == null)) {
            //window.location = "/logup"
        } else if ((username == "") && (password == "")) {
            //window.location = "/login"
        } else {
            //console.log(username, password)
            user.auth(username, password, (acknowledgment) => {
                if ("id" in acknowledgment) {
                    //window.localStorage.setItem('user_public_key', acknowledgment.get)
                    this.setState({
                        loggedIn: true
                    })
                } else if ("err" in acknowledgment) {
                    window.location = "/login"
                }
            })
        }
    }

    componentDidMount() {
        this.auto_login_if_possible()
    }

    render() {
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
                            <DropdownButton
                                size="sm"
                                title="Account"
                                variant="light"
                                id="dropdown-variants-success"
                                key='account'
                            >
                                <Dropdown.Item
                                    eventKey="log up"
                                    href="/logup"
                                >
                                    Logup
                                </Dropdown.Item>
                                <Dropdown.Item
                                    eventKey="log in"
                                    href="/login"
                                >
                                    Login
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    eventKey="log out"
                                    href="/logout"
                                >
                                    Logout
                                </Dropdown.Item>
                            </DropdownButton>
                        </Nav.Item>
                        <Nav.Item
                            className="Navigation-item"
                        >
                            <Link to="/about">About</Link>
                        </Nav.Item>
                    </Nav>

                    <Route
                        exact
                        path="/"
                        render={(props) =>
                            <Home
                                {...props}
                                user={user}
                                get_state={this.get_state}
                                set_state={this.set_state}
                            />
                        }
                    />

                    <Route
                        exact
                        path='/login'
                        render={(props) =>
                            <Login
                                {...props}
                                user={user}
                                get_state={this.get_state}
                                set_state={this.set_state}
                            />
                        }
                    />

                    <Route
                        exact
                        path='/logup'
                        render={(props) =>
                            <Logup
                                {...props}
                                user={user}
                            />
                        }
                    />

                    <Route
                        exact
                        path='/logout'
                        render={(props) =>
                            <Logout
                                {...props}
                                user={user}
                                get_state={this.get_state}
                                set_state={this.set_state}
                            />
                        }
                    />

                    <Route path="/about" component={About} />

                </Router>
            </div>
        )
    }
}

export default App;
