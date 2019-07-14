import React, { Component } from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

export class Todos extends Component {
  render() {
    return this.props.todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        check={this.props.check}
        deleteTodo={this.props.deleteTodo}
      />
    ));
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todos;
