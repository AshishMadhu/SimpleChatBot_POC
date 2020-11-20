import React, { Component } from "react";
import axios from "../../configs/axiosConfig";
import { urlPrefix, host } from "../../configs/globals";

type Props = {};

type data = {
  text: string;
  chat: string;
  id: number;
};

type State = {
  loading: boolean;
  data?: Array<data>;
};

class SelectChoiceView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    var id = window.location.pathname.split("/")[1];
    axios.get(`${urlPrefix}${host}/${id}/choices/`).then((res) =>
      this.setState({
        data: res.data,
        loading: false,
      })
    );
  }

  render() {
    return (
      <div>
        {this.state.loading && <p>Loading ...</p>}
        {!this.state.loading && (
          <div className="choice-inner-container">
            {this.state.data.map((item) => (
              <div className="choices" key={item.id}>{item.text}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SelectChoiceView;
