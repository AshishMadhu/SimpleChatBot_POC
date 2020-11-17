import React, { Component } from "react";

type Props = {};

type State = {
  createMessage: boolean;
  title: String;
};

class CreateMessage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      createMessage: true,
      title: "",
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 br-1">
            <button
              className={"btn btn-secondary btn-block"}
              onClick={() => {
                this.setState({
                  createMessage: true,
                });
              }}
            >
              Create Message
            </button>
          </div>
          {this.state.createMessage && (
            <div className="col-md-5">
              <form action="" className="form-group">
                <label htmlFor="Text">Text: </label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  name="text"
                  onChange={(event: any) =>
                    this.setState({
                      title: event.target.value,
                    })
                  }
                />
                <p>Type the message to display</p>
                <label htmlFor="choices">Choices</label>
                <div className="from-row">
                  <input
                    type="text"
                    name="choice"
                    id="choice"
                    className="form-control"
                  />
                  <button className="btn btn-primary">+</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CreateMessage;
