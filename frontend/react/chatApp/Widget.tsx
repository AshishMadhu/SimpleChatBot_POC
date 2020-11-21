import React, { Component } from "react";
import App from "./App";

type State = {
    show_app: boolean;
};

class Widget extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            show_app: false,
        };
    }

    render() {
        return (
            <div>
                {!this.state.show_app && (
                    <div className="chatbot-widget-container">
                        <button
                            className="chatbot-widget"
                            onClick={() => this.setState({ show_app: true })}
                        >
                            Chat
                        </button>
                    </div>
                )}
                {this.state.show_app && (
                    <div className="chatbot-container">
                        <App />
                    </div>
                )}
            </div>
        );
    }
}

export default Widget;
