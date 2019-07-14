import React, { Component } from "react";
import CustomButton from "../form/ButtonStyles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

export class AddTodo extends Component {
  state = {
    title: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
    document.getElementById("todo-title").value = "";
  };

  render() {
    return (
      <div className="centered">
        <FormControl>
          <TextField
            id="todo-title"
            name="title"
            aria-describedby="Enter a todo."
            label="Todo Title"
            variant="outlined"
            onChange={this.onChange}
          />
          <br />
          {CustomButton("Add Todo", this.onSubmit, this.props.theme)}
        </FormControl>
      </div>
    );
  }
}

export default AddTodo;
