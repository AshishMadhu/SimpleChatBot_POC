import React, { Component } from "react";

type Props = {};

type State = {
  display: string;
};

class Choice extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      display: "none",
    };
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            this.setState({
              display: "block",
            });
          }}
        >
          Add choices
        </button>
        <div style={{ display: this.state.display }}>
          <label htmlFor="choices">Choices</label>
          <input
            type="text"
            name="choice"
            id="choice"
            className="form-control"
          />
        </div>
      </div>
    );
  }
}

export default Choice;
