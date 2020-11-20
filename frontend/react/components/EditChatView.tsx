import React, { Component } from "react";
import MessageCreateView from "./MessageCreateView";
import CreateChoiceForm from "./subComponents/CreateChoiceForm";
import ResponseFom from "./subComponents/ResponseFom";

type Props = {};

type State = {
  createMessage: boolean;
  createResponse: boolean;
  createMoreMessage: boolean;
  createChoice: boolean;
};

class EditChatView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      createMessage: true,
      createMoreMessage: false,
      createResponse: false,
      createChoice: false,
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3 br-1">
          <button
            className={"btn btn-secondary btn-block"}
            onClick={() => {
              var createMoreMessage;
              var createMessage;
              if (this.state.createMessage) {
                createMessage = false;
                createMoreMessage = true;
              } else {
                createMessage = true;
                createMoreMessage = false;
              }
              this.setState({
                createMessage: createMessage,
                createResponse: false,
                createChoice: false,
                createMoreMessage: createMoreMessage,
              });
            }}
          >
            Create Message
          </button>
          <button
            className={"btn btn-secondary btn-block"}
            onClick={() => {
              this.setState({
                createMessage: false,
                createMoreMessage: false,
                createResponse: false,
                createChoice: true,
              });
            }}
          >
            Create Choice
          </button>
          <button
            className={"btn btn-secondary btn-block"}
            onClick={() => {
              this.setState({
                createMessage: false,
                createMoreMessage: false,
                createResponse: true,
                createChoice: false
              });
            }}
          >
            Create Response for Choice
          </button>
        </div>
        {this.state.createMessage && <MessageCreateView />}
        {this.state.createMoreMessage && <MessageCreateView />}
        {this.state.createResponse && <ResponseFom />}
        {this.state.createChoice && <CreateChoiceForm />}
      </div>
    );
  }
}

export default EditChatView;
