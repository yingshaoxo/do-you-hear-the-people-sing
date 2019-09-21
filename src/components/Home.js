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

    handle_send = () => {
        this.props.disable_input_box()

        if (this.state.input_text != "") {
            // do something
            //console.log(this.state.input_text)
            this.props.add_string_to_node(this.state.input_text, 0)
        }
    }

    render() {
        return (
            <div>
                <Modal centered show={this.props.show_input_box} onHide={this.props.disable_input_box}>
                    <Modal.Header closeButton>
                        <Modal.Title>What you wanna say?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup>
                            <FormControl autoFocus as="textarea"
                                onChange={ this.handle_input }
                                onKeyPress={event => {
                                    if (event.ctrlKey && event.key === "Enter") {
                                        this.handle_send()
                                    }
                                }}
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handle_send}>
                            Send
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
                color="default"
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
            <div className="col-md">
                <br />
                <Card bg={this.props.bg_color} text="white">
                    <Card.Header>{this.props.header}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            { this.props.text.split?
                                    this.props.text.split("\n").map((i,key) => {
                                        return <p key={key}>{i}</p>;
                                    })
                                    :
                                    this.props.text
                            }
                        </Card.Text>
                        {
                            //<br />
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
                {
                    text: "We are humans, not some kind of animal.",
                    date: new Date(1998, 3, 29)
                }
            ],
            show_input_box: false,
            gun: this.props.gun,
            user: this.props.user,
        }
    }

    enable_input_box = () => {
        if(this.state.user && this.state.user.is){
            this.setState({
                show_input_box: true
            })
        } else {
            this.props.history.push("/login")
        }
    }

    disable_input_box = () => {
        this.setState({
            show_input_box: false
        })
    }

    add_string_to_node = (text, id) => {
        console.log("added to gun: ", text)
        this.state.user.get('said').set({
            text: text,
            date: Date()
        });
    }

    add_saying_to_UI = (saying, id) => {
        console.log("added to state(UI): ", saying)
        this.setState({
            said: [...this.state.said, saying]
        })
    }

    get_cards = () => {
        let said = this.state.said

        said = said.sort(function(a,b){
            if (new Date(a.date) > new Date(b.date)) return -1;
            if (new Date(a.date) < new Date(b.date)) return 1;
            return 0;
        });

        //said = said.reverse()

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
        said.map((item, index) => {
            if ((index % 3) == 0) {
                cards.push(
                    <div className="row justify-content-md-center">
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
            <div className="row justify-content-md-center">
                {each_row}
            </div>
        )

        return cards
    }

    componentDidMount() {
        this.state.gun.on("auth", () => {
            console.log("user verified")

            //this.state.user.get('said').put(null)
            //return

            this.state.user.get('said').map().on( (say_item, id) => {
                console.log("node updating")
                if (say_item && !this.state.said.includes(say_item)) {
                    if (Object.keys(say_item).includes("date") && Object.keys(say_item).includes("text")) {
                        this.add_saying_to_UI(say_item, id)
                    }
                }
            }
            )
        })
    }

    render() {
        return (
            <div className="App-body">
                <p className="small">
                    {this.get_state().loggedIn ? '' : ''}
                </p>

                <div className="container">
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
                    add_string_to_node={this.add_string_to_node}
                    enable_input_box={this.enable_input_box}
                    disable_input_box={this.disable_input_box}
                >
                </InputWindow>
            </div>
        )
    }
}
