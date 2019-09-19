import React, { Component } from "react";
import { Card, Button, FormGroup, FormControl, Modal, InputGroup } from "react-bootstrap";
import "./Home.css";

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

class InputWindow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input_text: "",
        };
    }

    handle_input = (event) => {
        this.setState({
            input_text: event.target.value.trim()
        });
    }

    handle_done = () => {
        this.props.disable_input_box()

        if (this.state.input_text != "") {
            // do something
            console.log(this.state.input_text)
        }
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show_input_box} onHide={this.props.disable_input_box}>
                    <Modal.Header closeButton>
                        <Modal.Title>What you wanna say?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup>
                            <FormControl autoFocus as="textarea"
                                onChange={ this.handle_input }
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handle_done}>
                            Done
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const useStyles = makeStyles(theme => ({
    fab: {
        margin: 0,
        top: 'auto',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        left: 'auto',
        position: 'fixed',
    }
}));

function FloatingActionButtons(props) {
    const classes = useStyles();

    return (
        <div>
            <Fab
                size="large"
                color="warning"
                aria-label="add"
                className={classes.fab}
                onClick={props.enable_input_box}
            >
                <AddIcon />
            </Fab>
        </div>
    );
}

class MyCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="col-md">
                <br />
                <Card bg={this.props.bg_color} text="white">
                    <Card.Header>{this.props.header}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {this.props.text}
                        </Card.Text>
                        <br />
                        {
                            //<ThumbUpIcon style={{ marginRight: "28%" }}>up</ThumbUpIcon>
                            //<ThumbDownIcon>down</ThumbDownIcon>
                        }
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
                { text: "We are humans, not some kind of animal." }
            ],
            show_input_box: false,
        }

    }

    enable_input_box = () => {
        this.setState({
            show_input_box: true
        })
    }

    disable_input_box = () => {
        this.setState({
            show_input_box: false
        })
    }

    get_cards = () => {
        let said = []
        for (let i = 0; i <= 30; i++) {
            said.push(
                { text: "We are humans, not some kind of animal." }
            );
        }

        Array.prototype.getRandom = function (cut) {
            var i = Math.floor(Math.random() * this.length);
            if (cut && i in this) {
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
            }
            color = colors.getRandom()
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
                    {this.get_state().loggedIn ? '' : ''}
                </p>

                <div class="container">
                    {this.get_cards()}
                    <br />
                </div>

                <FloatingActionButtons
                    enable_input_box={this.enable_input_box}
                    disable_input_box={this.disable_input_box}
                >
                </FloatingActionButtons>

                <InputWindow
                    show_input_box={this.state.show_input_box}
                    enable_input_box={this.enable_input_box}
                    disable_input_box={this.disable_input_box}
                >
                </InputWindow>
            </div>
        )
    }
}
