import React, { Component } from "react";

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

type Prop = {
    resData: Response;
};

class ShowResponse extends Component<Prop> {
    render() {
        return (
            <div className="response-preview-container">
                <div className="chat-message message">
                    {this.props.resData.choice_text}
                </div>
                <div className="chat-message bot">
                    <p>{this.props.resData.message_details.text}</p>
                    <ul className="input-tag__tags">
                        {this.props.resData.message_details.choices.map((tag, i: any) => (
                            <li key={tag.id}>{tag.text}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ShowResponse;
