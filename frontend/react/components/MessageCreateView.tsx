import React, { Component } from "react";
import ChoiceTags from "./subComponents/ChoiceTags";
import MessageForm from "./subComponents/MessageForm";

type Props = {};

type ChoiceObject = {
  id: number;
  chat: string;
  text: string;
};

type State = {
  messageData?: {id: number, text:string, chat:string, choices: Array<ChoiceObject>};
  showForm: boolean;
  text: string;
};

class MessageCreateView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showForm: true,
      text: '',
    };
  }

  render() {
    return (
      <div className="col-md-5">
        {this.state.showForm && (
          <MessageForm setState={this.setState.bind(this)} />
        )}
        {!this.state.showForm && (
          <span className="badge badge-success">
            Message Created succesfully, If you wish add choice
          </span>
        )}
        {!this.state.showForm && (<div className="chat-message bot">
          <p>{this.state.messageData.text}</p>
          <ul className="input-tag__tags">
            {this.state.messageData.choices.map((tag, i: any) => (
              <li key={tag.id}>
                {tag.text}
              </li>
            ))}
          </ul>
          </div>)}
        {!this.state.showForm && (<div className="choice-container">
          <ChoiceTags messageId = {this.state.messageData.id} setState = {this.setState.bind(this)}/>
          </div>)}
      </div>
    );
  }
}

export default MessageCreateView;
