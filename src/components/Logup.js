import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Logup.css";

export default class Logup extends Component {
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
        console.log(this.props)
        var user = this.props.gun.user()
        user.create(this.state.username, this.state.password)
    }

    render() {
        return (
            <div className="Logup">
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
                        Log up
                    </Button>
                </form>
            </div>
        );
    }
}
