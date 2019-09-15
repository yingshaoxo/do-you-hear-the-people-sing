import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.get_state = this.props.get_state;
    }

    render() {
        return (
            <div className="App-body">
                <p>
                    Do you hear the people sing?
                </p>
                <p>
                    {this.get_state().loggedIn?
                            <p> Yes! </p>
                            :
                            <p> No! </p>
                    }
                </p>
            </div>
        )
    }
}
