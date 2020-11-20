import React, { Component } from "react";
import axios from "../../configs/axiosConfig";
import { urlPrefix, host } from "../../configs/globals";

type Props = {
  messageId: number;
  setState: Function;
};

type TagObject = {
  id: number;
  chat: string;
  text: string;
};

type State = {
  SelectedTags: Array<TagObject>;
  fetchedTags?: Array<TagObject>;
};

class ChoiceTags extends React.Component<Props, State> {
  tagInput: any;
  id: string;
  constructor(props: Props) {
    super(props);
    this.id = window.location.pathname.split("/")[1];
    this.state = {
      SelectedTags: [],
    };
  }

  componentDidMount() {
    axios.get(`${urlPrefix}${host}/${this.id}/choices/`).then((res) =>
      this.setState({
        fetchedTags: res.data,
      })
    );
  }

  removeTag = (i: number) => {
    const newTags = [...this.state.SelectedTags];
    const removedTag = newTags.splice(i, 1)[0];
    this.setState({
      SelectedTags: newTags,
      fetchedTags: [...this.state.fetchedTags, removedTag],
    });
  };

  inputKeyDown = (e: any) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (
        this.state.SelectedTags.find(
          (tag) => tag.text.toLowerCase() === val.toLowerCase()
        )
      ) {
        return;
      }
      axios
        .post(`${urlPrefix}${host}/${this.id}/choices/`, { text: val })
        .then((res) => {
          if (res.status === 201)
            this.setState({
              SelectedTags: [...this.state.SelectedTags, res.data],
            });
        });
      this.tagInput.value = null;
    } else if (e.key === "Backspace" && !val) {
      if(this.state.SelectedTags.length != 0)
        this.removeTag(this.state.SelectedTags.length - 1);
    }
  };

  handleOnClick(tag: TagObject, i: any) {
    if (this.state.fetchedTags.find((obj) => obj.id === tag.id)) {
      const newTags = [...this.state.fetchedTags];
      const i = newTags.indexOf(tag);
      const removedTag = newTags.splice(i, 1)[0];
      this.setState({
        SelectedTags: [...this.state.SelectedTags, removedTag],
        fetchedTags: newTags,
      });
    }
  }

  handleBind(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    var choices_id = this.state.SelectedTags.map((tag) => tag.id);
    axios
      .patch(
        `${urlPrefix}${host}/${this.id}/messages/${this.props.messageId}/`,
        {
          choices_id: choices_id,
        }
      )
      .then((res) => {
        if (res.status === 200) {
            this.props.setState({
                messageData: res.data
            })
        }
      });
  }

  render() {
    const { SelectedTags } = this.state;

    return (
      <div className="input-tag">
        {this.props.messageId && <h3 style={{ width: "100%" }}>Select or Create Choice</h3>}
        <p className="help-text">
          Remember response are given accorinding to choices
        </p>
        <ul className="input-tag__tags">
          {SelectedTags.map((tag, i: any) => (
            <li key={i}>
              {tag.text}
              <button
                type="button"
                onClick={() => {
                  this.removeTag(i);
                }}
              >
                +
              </button>
            </li>
          ))}
          <li className="input-tag__tags__input">
            <input
              type="text"
              placeholder="Create choice"
              onKeyDown={(e) => this.inputKeyDown(e)}
              ref={(c) => {
                this.tagInput = c;
              }}
            />
          </li>
        </ul>
        {this.props.messageId && <p className="select-predefined">Select predefined</p>}
        {!this.props.messageId && <p className="select-predefined">Available Choices</p>}
        {this.state.fetchedTags && (
          <ul className="input-tag__tags">
            {this.state.fetchedTags.map((tag, i: any) => (
              <li onClick={(e) => this.handleOnClick(tag, i)} key={i}>
                {tag.text}
              </li>
            ))}
          </ul>
        )}
        <br/>

        {this.props.messageId && <button
          className="btn btn-success btn-block"
          onClick={(e) => this.handleBind(e)}
        >
          Bind Choices
        </button>}
      </div>
    );
  }
}

export default ChoiceTags;
