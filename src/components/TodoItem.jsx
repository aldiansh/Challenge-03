import React, { Component } from "react";

export default class TodoItem extends Component {
  render() {
    const { title, handleDelete, handleEdit, complete, handleCheck } =
      this.props;
    const className = complete ? "text-decoration-line-through" : "";
    return (
      <li className="list-group-item text-capitalize d-flex justify-content-between my-2">
        <h6 className={className}>{title}</h6>
        <div className="todo-icon">
          <input
            type="checkbox"
            label={title}
            checked={complete}
            onChange={() =>
              this.props.id && handleCheck(this.props.id, complete)
            }
          />
          <span className="mx-2 text-warning" onClick={handleEdit}>
            <i className="fas fa-pen" />
          </span>
          <span className="mx-2 text-danger" onClick={handleDelete}>
            <i className="fas fa-trash" />
          </span>
        </div>
      </li>
    );
  }
}
