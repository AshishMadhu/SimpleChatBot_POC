import React, { Component } from "react";
import axios from "../../configs/axiosConfig";
import { urlPrefix, host } from "../../configs/globals";

type Props = {
  setState: Function;
};

type State = {
  text: String;
};

class MessageForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    var id = window.location.pathname.split("/")[1];
    axios
      .post(`${urlPrefix}${host}/${id}/messages/`, { text: this.state.text })
      .then((res) => {
        console.log(res);
        if (res.status === 201)
          this.setState({
            text: "",
          });
        this.props.setState({
          messageData: res.data,
          showForm: false,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <form
        action=""
        className="form-group"
        onSubmit={(event) => this.handleSubmit(event)}
      >
        <label htmlFor="Text">Text: </label>
        <input
          type="text"
          className="form-control"
          id="text"
          name="text"
          onChange={(event: any) =>
            this.setState({
              text: event.target.value,
            })
          }
        />
        <p>Type the message to display</p>
        <button type="submit" className="btn btn-outline-primary">
          Create
        </button>
      </form>
    );
  }
}

export default MessageForm;
