import React, { Component } from "react";
import QuillEditor from "react-quill";
import PropTypes from "prop-types";

import "react-quill/dist/quill.snow.css";

class EditedNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || "",
      content: props.content || "",
    };
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  EditorChangeHandler = value => {
    this.setState({ content: value });
  };

  submitHandler = event => {
    event.preventDefault();
    const { title, content } = this.state;
    this.props.submitHandler(title, content);
  };

  render() {
    return (
      <div className="news-form">
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            name="title"
            onChange={this.changeHandler}
            value={this.state.title}
            placeholder="Заголовок"
          />
          <QuillEditor
            value={this.state.content}
            onChange={this.EditorChangeHandler}
            modules={this.modules}
          />
          <input type="submit" className="btn btn-send" value="Сохранить" />
          <input
            type="button"
            className="btn btn-cancel"
            onClick={this.props.cancelHandler}
            value="Отмена"
          />
        </form>
      </div>
    );
  }
}

EditedNews.prototypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  submitHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
};

export default EditedNews;
