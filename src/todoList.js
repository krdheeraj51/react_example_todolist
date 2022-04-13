import { Component } from "react";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      task: { name: "", isDone: false },
      isDone: false,
      completedTask: 0,
      taskCounter: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    let updatedTask = {
      name: event.target.value,
      isDone: false
    };

    this.setState({ task: updatedTask });
  };

  addListItem = () => {
    if (this.state.task.name !== "") {
      let newItemList = this.state.itemList.concat(this.state.task);
      this.setState({
        itemList: newItemList,
        task: { name: "", isDone: false },
        taskCounter: newItemList.length
      });
    }
  };

  completeCheck = (task) => {
    const filteredData = this.state.itemList.filter((item) => item !== task);
    const updateTask = { name: task.name, isDone: !task.isDone };
    let newItemList = filteredData.concat(updateTask);
    let completedTasks = newItemList.filter((item) => item.isDone === true);
    this.setState({
      itemList: newItemList,
      task: { name: "", isDone: false },
      taskCounter: newItemList.length,
      completedTask: completedTasks.length
    });
    this.setState(({ isDone }) => ({ isDone: !isDone }));
  };

  render() {
    return (
      <>
        <div>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.task.name}
          />
          <button type="button" onClick={this.addListItem}>
            Add
          </button>
          <p>
            {this.state.completedTask} remaining out of {this.state.taskCounter}{" "}
            tasks
          </p>

          <ul>
            {this.state.itemList.map((item) => (
              <li
                onClick={() => this.completeCheck(item)}
                className={item.isDone ? "is-done" : ""}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
      </>
    );
  }
}
