import React, { Component } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { Messages, Message, ResponseData } from "../types/main";
import { hostName } from "../configs/globals";
import ChatApp from "./ChatApp";

declare global {
    interface Window {
        chat_id: string;
    }
}

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
        this.chat_id = window.chat_id;
        this.rws = new ReconnectingWebSocket(
            "ws://" + hostName + "/ws/chat/" + this.chat_id + "/"
        );
        this.state = {
            chat_title: null,
            first_message: null,
            messages: [],
        };
    }

    onChoiceClickHandler(id: number) {
        this.rws.send(JSON.stringify({'type': 'choice_click', 'choice_id': id}))
    }

    componentDidMount() {
        this.rws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
            if (data["type"] === "chat_join") {
                const user_text: string = null;
                const response: ResponseData = {
                    choices: data.message_details.message.choices,
                    text: data.message_details.message.text,
                }
                const new_message = [...this.state.messages];
                new_message.push({user_text, response})
                this.setState({
                    messages: new_message,
                    chat_title: data.message_details.title
                })
            }
            if (data["type"] == "choice_click") {
                const user_text = data.response.choice_text
                const response: ResponseData = {
                    message: data.response.message,
                    message_details: data.response.message_details
                }
                const new_messages = [...this.state.messages];
                new_messages.push({user_text, response});
                this.setState({
                    messages: new_messages,
                })
            }
        };
    }

    render() {
        return (
            <div>
                <ChatApp
                    title={this.state.chat_title}
                    messages={this.state.messages}
                    onChoiceClickHandler={(id: number) =>
                        this.onChoiceClickHandler(id)
                    }
                />
            </div>
        );
    }
}

export default App;
