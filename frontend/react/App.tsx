import React, { Component } from "react";
import "./App.css";
import EditChatView from "./components/EditChatView";

export default class App extends Component {
    state = {
        step: 0,
    };

    async changeState() {
        await this.setState({
            step: this.state.step + 1,
        });
        console.log(this.state.step);
    }

    render() {
        return (
                <div className="App">
                    <EditChatView />
                </div>
        );
    }
}
