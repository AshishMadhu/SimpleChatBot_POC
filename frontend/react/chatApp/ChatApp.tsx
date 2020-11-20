import React, { Component } from "react";
import Header from "./components/Header";
import { Messages } from "../types/main";

type Props = {
    title: string;
    messages: Array<Messages>;
    onChoiceClickHandler: Function;
};

class ChatApp extends Component<Props> {
    handleClick(id: number) {
        this.props.onChoiceClickHandler(id);
    }

    render() {
        return (
            <div className="chatapp-container">
                <Header title={this.props.title} />
                {this.props.messages && (
                    <div className="chatapp-messages-container">
                        {this.props.messages.map((message, i) => (
                            <div className="chatapp-messages" key={i}>
                                {message.user_text && (
                                    <div className="chatapp-response-container">
                                        <div className="chatapp-user-message">
                                            {message.user_text}
                                        </div>
                                    </div>
                                )}
                                <div className="chatapp-response-container">
                                    <div className="chatapp-response">
                                        {message.response.text && (
                                            <div className="chatapp-response-text">
                                                <p>{message.response.text}</p>
                                                <div className="chatapp-response-choices">
                                                    {message.response.choices.map(
                                                        (choice, i) => (
                                                            <div
                                                                className="chatapp-response-choice"
                                                                key={i}
                                                                onClick={(e) =>
                                                                    this.handleClick(
                                                                        choice.id
                                                                    )
                                                                }
                                                            >
                                                                {choice.text}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {message.response.message_details && (
                                            <div className="chatapp-response-text">
                                                <p>
                                                    {
                                                        message.response
                                                            .message_details
                                                            .text
                                                    }
                                                </p>
                                                <div className="chatapp-response-choices">
                                                    {message.response.message_details.choices.map(
                                                        (choice, i) => (
                                                            <div
                                                                className="chatapp-response-choice"
                                                                key={i}
                                                                onClick={(e) =>
                                                                    this.handleClick(
                                                                        choice.id
                                                                    )
                                                                }
                                                            >{choice.text}</div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default ChatApp;
