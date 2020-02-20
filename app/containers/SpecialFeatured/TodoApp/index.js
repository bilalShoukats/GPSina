import React, {Fragment} from "react";
import TodosList from "./components/todos-list"
import CreateTodo from "./components/create-todo";
import Card from 'components/Card/Loadable'
import "./style.scss";
import {Helmet} from "react-helmet";

const todos = {
  items: [],
  lsKey: "todos",
  populate() {
    this.items = this.get();
  },
  get() {
    try {
      return JSON.parse(localStorage.getItem(this.lsKey)) || []
    } catch (e) {
    }
    return [];
  },
  save() {
    localStorage.setItem(this.lsKey, JSON.stringify(this.items));
  },
  toggle(id) {
    let todoItem = this.items[id];
    todoItem.isCompleted = !todoItem.isCompleted;
    this.save();
  },
  add(obj) {
    this.items.push(obj);
    this.save();
  },
  remove(id) {
    this.items.splice(id, 1);
    this.save();
  },
  update(id, task) {
    let todoItem = this.items[id];
    todoItem.task = task;
    this.save();
  }
};

todos.populate();


class TidoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: todos.items
    };
  }

  createTask = (task) => {
    task = task.trim();
    if (!task) {
      return;
    }
    todos.add({
      task,
      isCompleted: false
    });
    this.setState({
      todos: this.state.todos
    });
  }

  toggleTask = (taskId) => {
    todos.toggle(taskId);
    this.setState({
      todos: this.state.todos
    });
  }
  editTask = (taskId, task) => {
    todos.update(taskId, task);
    this.setState({
      todos: this.state.todos
    });
  }
  deleteTask = (taskId) => {
    todos.remove(taskId);
    this.setState({
      todos: this.state.todos
    });
  }

  render() {
    return (
      <Fragment>
        <h2 className="breadcumbTitle">Todos</h2>
        <Card
          title='TODOS'
          className="todoCard"
        >
          <CreateTodo
            createTask={this.createTask}
          />
          <TodosList
            todos={this.state.todos}
            toggleTask={this.toggleTask}
            editTask={this.editTask}
            deleteTask={this.deleteTask}
          />
        </Card>
      </Fragment>
    );
  }

}

export default TidoList
