import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("username:", this.state.username)
        console.log("password:", this.state.password)

        var user = this.props.user
        var gun = this.props.gun
        var set_state = this.props.set_state

        user.auth(this.state.username, this.state.password, (acknowledgment) => {
            if ("id" in acknowledgment) {
                //window.localStorage.setItem('user_public_key', acknowledgment.get)
                window.localStorage.setItem('username', this.state.username)
                window.localStorage.setItem('password', this.state.password)
                set_state({
                    loggedIn: true
                })
                gun.get('users_public_key').set(user.pair().pub)
                alert("Sign In successfully!")
                //this.props.history.push("/")
                window.location = "/"
            } else if ("err" in acknowledgment) {
                alert(acknowledgment.err)
            }
        })
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username">
                        <FormControl
                            autoFocus
                            type="text"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormControl
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Log in
                    </Button>
                </form>
            </div>
        );
    }
}
