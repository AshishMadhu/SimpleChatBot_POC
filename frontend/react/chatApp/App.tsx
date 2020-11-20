import React, { Component } from "react";
import axios from "../configs/axiosConfig";
import { host, urlPrefix } from "../configs/globals";
import ReconnectingWebSocket from "reconnecting-websocket";
import { Messages, Message, ResponseData } from "../types/main";

import "react-chat-widget/lib/styles.css";
import ChatApp from "./ChatApp";

type State = {
    chat_title: string;
    first_message: Array<Message>;
    messages: Array<Messages>;
};

class App extends Component<any, State> {
    chat_id: string;
    rws: ReconnectingWebSocket;

    constructor(props: any) {
        super(props);
        this.chat_id = window.location.pathname.split("/")[2];
        this.rws = new ReconnectingWebSocket(
            "ws://" + window.location.host + "/ws/chat/" + this.chat_id + "/"
        );
        this.state = {
            chat_title: null,
            first_message: null,
            messages: [],
        };
    }

    onChoiceClickHandler(id:number) {
        axios.get(`${urlPrefix}${host}/${this.chat_id}/responses/choice/?choice_id=${id}`).then((res) => {
            if(res.status === 200) {
                const user_text = res.data.choice_text;
                const response: ResponseData = {
                    chat: res.data.chat,
                    message: res.data.message,
                    message_details: res.data.message_details
                }
                const newMessages = [...this.state.messages]
                newMessages.push({user_text, response})
                this.setState({
                    messages: newMessages
                })
            }
        })
    }

    componentDidMount() {
        this.rws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data["type"] === "chat_join") {
                axios
                    .get(
                        `${urlPrefix}${host}/${this.chat_id}/messages/${data.message_id}/`
                    )
                    .then((res) => {
                        if (res.status === 200) {
                            const user_text: string = null;
                            const response: ResponseData = {
                                chat: res.data.chat,
                                choices: res.data.choices,
                                text: res.data.text,
                            };
                            const newMessages = this.state.messages;
                            newMessages.push({ user_text, response });
                            this.setState({
                                messages: newMessages,
                            });
                        }
                    });
            }
        };

        axios.get(`${urlPrefix}${host}/chats/${this.chat_id}/`).then((res) => {
            if (res.status === 200) {
                this.setState({
                    chat_title: res.data.title,
                });
            }
        });
    }

    render() {
        return (
            <div>
                <ChatApp
                    title={this.state.chat_title}
                    messages={this.state.messages}
                    onChoiceClickHandler = {(id: number) => this.onChoiceClickHandler(id)}
                />
            </div>
        );
    }
}

export default App;
