import React, { Component } from "react";
import axios from "../../configs/axiosConfig";
import { urlPrefix, host } from "../../configs/globals";
import ShowError from "./ShowError";
import ShowResponse from "./ShowResponse";

type Props = {};

type Choice = {
    chat: string;
    text: string;
    id: number;
};

type Message = {
    chat: string;
    choices: Array<Choice>;
    text: string;
    id: number;
};

type Response = {
    chat: string;
    choice: number;
    choice_text: string;
    message: number;
    id: number;
    message_details: Message;
};

type State = {
    showResponse: boolean;
    loading: boolean;
    messages: Array<Message>;
    choices: Array<Choice>;
    err: string;
    choice: number;
    message: number;
    resData: Response;
};

class ResponseFom extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showResponse: false,
            loading: true,
            messages: null,
            choices: null,
            err: null,
            choice: null,
            message: null,
            resData: null,
        };
    }

    componentDidMount() {
        var id = window.location.pathname.split("/")[1];
        axios
            .get(`${urlPrefix}${host}/${id}/messages/`)
            .then((messagRes) => {
                axios
                    .get(
                        `${urlPrefix}${host}/${id}/choices/get_filtered_choices/`
                    )
                    .then((choicesRes) => {
                        console.log(choicesRes);
                        this.setState({
                            messages: messagRes.data,
                            choices: choicesRes.data,
                            loading: false,
                        });
                    })
                    .catch((err) =>
                        this.setState({
                            err:
                                "Somethig went wrong in fetching Messages and Choice!",
                        })
                    );
            })
            .catch((err) =>
                this.setState({
                    err: "Somethig went wrong in fetching Messages and Choice!",
                })
            );
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        var id = window.location.pathname.split("/")[1];
        if (this.state.choice === null || this.state.message === null) {
            this.setState({
                err: "Fill both fields!",
            });
        } else {
            axios
                .post(`${urlPrefix}${host}/${id}/responses/`, {
                    choice: this.state.choice,
                    message: this.state.message,
                })
                .then((res) => {
                    if (res.status === 201) {
                        axios
                            .get(
                                `${urlPrefix}${host}/${id}/choices/get_filtered_choices/`
                            )
                            .then((choicesRes) => {
                                this.setState({
                                    choices: choicesRes.data,
                                    showResponse: true,
                                    resData: res.data,
                                    choice: null,
                                    message: null,
                                });
                            })
                            .catch((err) =>
                                this.setState({
                                    err:
                                        "Somethig went wrong in fetching Messages and Choice!",
                                })
                            );
                    }
                })
                .catch((err) =>
                    this.setState({ err: "Something went wrong in submit!" })
                );
        }
    }

    render() {
        var form = null;
        if (this.state.messages && this.state.choices) {
            form = (
                <form
                    action=""
                    className="from-group"
                    onSubmit={(event) => this.handleSubmit(event)}
                >
                    <label htmlFor="id_choice">Choice</label>
                    <select
                        name="choice"
                        id="id_choice"
                        className="form-control"
                        onChange={(e) => {
                            this.setState({
                                choice: Number(e.target.value),
                            });
                        }}
                    >
                        <option value="">-- select Choice --</option>
                        {this.state.choices.map((choice, i) => (
                            <option value={choice.id} key={i}>
                                {choice.text}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="id_message">Message</label>
                    <select
                        name="message"
                        id="id_message"
                        className="form-control"
                        onChange={(e) => {
                            this.setState({
                                message: Number(e.target.value),
                            });
                        }}
                    >
                        <option value="">-- select Message --</option>
                        {this.state.messages.map((message, i) => (
                            <option value={message.id} key={i}>
                                {message.text}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button
                        type="submit"
                        className="btn btn-outline-success btn-block"
                    >
                        Create Response
                    </button>
                </form>
            );
        }
        return (
            <div className="col-md-5">
                {!this.state.showResponse && (
                    <div>
                        <p className="alert alert-warning help-text">
                            You need to select a choices and then choose the
                            right message to respond to that choice
                        </p>
                        {this.state.err && <ShowError err={this.state.err} />}
                        {this.state.loading && <p>loading</p>}
                        {form}
                    </div>
                )}
                {this.state.showResponse && (
                    <ShowResponse resData={this.state.resData} />
                )}
                {this.state.showResponse && (
                    <button
                        className="btn btn-outline-danger btn-block"
                        onClick={() =>
                            this.setState({
                                showResponse: false,
                            })
                        }
                    >
                        Create More Response
                    </button>
                )}
            </div>
        );
    }
}

export default ResponseFom;
