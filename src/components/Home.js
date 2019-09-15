import React, { Component } from "react";
import { Card, Button, FormGroup, FormControl } from "react-bootstrap";
import "./Home.css";


class MyCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="col-md">
                <br/>
                <Card bg={this.props.bg_color} text="white">
                    <Card.Header>{this.props.header}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {this.props.text}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.get_state = this.props.get_state;
        this.set_state = this.props.set_state;

        this.state = {
            said: [
                {text: "We are humans, not some kind of animal."}
            ]
        }

    }

    get_cards = () => {
        let said = []
        for (let i =0; i <= 30; i++) {
            said.push(
                {text: "We are humans, not some kind of animal."}
            );
        }

        Array.prototype.getRandom= function(cut){
            var i= Math.floor(Math.random()*this.length);
            if(cut && i in this){
                return this.splice(i, 1)[0];
            }
            return this[i];
        }
        let colors = ["primary", "secondary", "success", "danger", "warning", "info", "dark"]
        let color = colors.getRandom()

        let cards = []
        let each_row = []
        //this.state.said.map((item) => {
        said.map((item, index) => {
            if ((index % 3) == 0) {
                cards.push(
                    <div class="row justify-content-md-center">
                        {each_row}
                    </div>
                )
                each_row = []
                color = colors.getRandom()
            }
            each_row.push(
                <MyCard
                    header={item.header}
                    title={item.title}
                    text={item.text}
                    bg_color={color}
                >
                </MyCard>
            )
        })

        cards.push(
            <div class="row justify-content-md-center">
                {each_row}
            </div>
        )

        return cards
    }

    render() {
        return (
            <div className="App-body">
                <p className="small">
                    {this.get_state().loggedIn? '': ''}
                </p>

                <div class="container">
                    {this.get_cards()}
                    <br/>
                </div>
            </div>
        )
    }
}