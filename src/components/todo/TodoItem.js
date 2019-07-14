import React, { Component } from "react";
import PropTypes from "prop-types";
import "./TodoItem.scss";

export class TodoItem extends Component {
  getStyle() {
    return this.props.todo.checked ? "todo completed" : "todo";
  }

  render() {
    const { id, title } = this.props.todo;
    return (
      <div>
        <p className={this.getStyle()}>
          <input type="checkbox" onChange={this.props.check.bind(this, id)} />
          {title}
          <button
            className="delete"
            onClick={this.props.deleteTodo.bind(this, id)}
          >
            x
          </button>
        </p>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default TodoItem;
