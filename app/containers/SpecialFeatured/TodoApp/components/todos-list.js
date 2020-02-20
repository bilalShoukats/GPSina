import React from "react";
import TodosListItem from "./todos-list-item";

export default class TodosList extends React.Component {
    renderItems() {
        return this.props.todos.map((c, index) => {
            return (
                <TodosListItem
                    key={index}
                    {...c}
                    id={index}
                    toggleTask={this.props.toggleTask}
                    editTask={this.props.editTask}
                    deleteTask={this.props.deleteTask}
                />
            )
        });
    }
    render() {
        if (!this.props.todos.length) {
            return <p className="tutorial">Create your first todo! :)</p>;
        }
        return (
            <ul className="todoListItems">
                {this.renderItems()}
            </ul>
        )
    }
}
