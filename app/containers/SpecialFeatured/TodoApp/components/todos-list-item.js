import React from "react";
import { Grid, Button } from '@material-ui/core'

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    setEditState = (isEditing) => {
        this.setState({
            isEditing
        });
    }

    toggleTask = () => {
        this.props.toggleTask(this.props.id);
    }

    editTask = (e) => {
        this.props.editTask(this.props.id, this.refs.task.value);
        this.setState({
            isEditing: false
        });
        e.preventDefault();
    }

    deleteTask = () => {
        this.props.deleteTask(this.props.id);
    }
    renderActionSection() {
        if (this.state.isEditing) {
            return (
                <div className="todoBtns">
                    <Button className="btn badge-success " onClick={this.editTask}>Save</Button>
                    <Button className="btn badge-warning" onClick={this.setEditState.bind(this, false)}>Cancel</Button>
                </div>
            );
        }
        return (
            <div className="todoBtns">
                <Button className="btn badge-default" onClick={this.setEditState.bind(this, true)}>Edit</Button>
                <Button className="btn badge-danger" onClick={this.deleteTask.bind(this)}>Delete</Button>
            </div>
        );
    }

    renderTask() {
        const { task, isCompleted } = this.props;

        if (this.state.isEditing) {
            return (
                <form
                    className="editForm"
                    onSubmit={this.editTask}>
                    <input
                        ref="task"
                        defaultValue={task}
                        autoFocus
                    />
                </form>
            );
        }

        return (
            <p className="todoText" onClick={this.toggleTask}>
                {task}
            </p>
        );
    }

    render() {
        const { isCompleted } = this.props;
        return (
            <li className={"todo-" + (isCompleted ? "completed" : "not-completed")}>
                {this.renderTask()}
                {this.renderActionSection()}
            </li>
        )
    }


}
