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

        var gun = this.props.gun
        var user = gun.user()

        user.auth(this.state.username, this.state.password, (acknowledgment) => {
            if ("id" in acknowledgment) {
                alert("Sign In successfully!")
                this.props.history.push("/")
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
