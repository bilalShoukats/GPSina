import React from "react";
import { Grid, Button } from '@material-ui/core'

export default class CreateTodo extends React.Component {
    onSubmit = (e) => {
        this.props.createTask(this.refs.title.value);
        this.refs.title.value = "";
        e.preventDefault();
    }
    render() {
        return (
            <form
                onSubmit={this.onSubmit}
                className="addTodo">
                <input
                    type="text"
                    placeholder="Add Todo Text"
                    ref="title"
                    autoFocus
                />
                <Button>Add Todo List</Button>
            </form>
        );
    }
}
