import React, { Component } from "react";
import TodoItem from "./TodoItem";
import { Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class TodoList extends Component {
  state = {
    filter: "all",
    searchQuery: "",
  };

  handleFilter = (filter) => {
    this.setState({ filter });
  };

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const {
      items,
      clearList,
      handleDelete,
      handleEdit,
      handleCheck,
      handleDeleteDone,
    } = this.props;

    const buttonStyle = {
      width: "100%",
      padding: "10px",
    };

    const { filter, searchQuery } = this.state;
    const filteredItems =
      filter === "done"
        ? items.filter((item) => item.complete)
        : filter === "todo"
        ? items.filter((item) => !item.complete)
        : items;
    const searchedItems = filteredItems.filter((item) =>
      item.task.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <ul className="list-group my-5">
        <h3 className="text-capitalize text-center">Todo Search</h3>
        <div className="card card-body my-3">
          <div className="container">
            <Row>
              <Col sm={8} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <Form className="d-flex" onSearch={this.handleSearch}>
                  {" "}
                  <div className="input-group-text bg-info text-white">
                    <i className="fas fa-search fa-2x" />
                  </div>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={this.handleSearch}
                  />
                </Form>
              </Col>
            </Row>
          </div>
          <div className="container">
            <Row>
              <Col sm={8} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <button
                  style={buttonStyle}
                  type="submit"
                  className="btn btn-block btn-info text-white mt-3"
                >
                  Search
                </button>
              </Col>
              <Col sm={4} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <Link to={"/todoinput"}>
                  <button
                    // as={Link}
                    // to="/todoinput"
                    style={buttonStyle}
                    type="button"
                    className="btn btn-block btn-info text-white mt-3"
                  >
                    Add new tasks
                  </button>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
        <h3 className="text-capitalize text-center">Todo List</h3>
        <div className="container">
          <Row>
            <Col sm={4} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <button
                style={buttonStyle}
                type="button"
                className="btn btn-info btn-block text-capitalize mt-5 text-white"
                onClick={() => this.handleFilter("all")}
              >
                All
              </button>
            </Col>
            <Col sm={4} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <button
                style={buttonStyle}
                type="button"
                className="btn btn-info btn-block text-capitalize mt-5 text-white"
                onClick={() => this.handleFilter("done")}
              >
                Done
              </button>
            </Col>
            <Col sm={4} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <button
                style={buttonStyle}
                type="button"
                className="btn btn-info btn-block text-capitalize mt-5 text-white"
                onClick={() => this.handleFilter("todo")}
              >
                Todo
              </button>
            </Col>
          </Row>
        </div>
        {searchedItems.map((item) => {
          return (
            <TodoItem
              // style={item.complete ? {} : { textDecoration: "line-through" }}
              key={item.id}
              title={item.task}
              complete={item.complete}
              handleDelete={() => handleDelete(item.id)}
              handleEdit={() => handleEdit(item.id)}
              handleCheck={() => handleCheck(item.id)}
            />
          );
        })}

        <div className="container">
          <Row>
            <Col sm={6} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <button
                style={buttonStyle}
                type="button"
                className="btn btn-danger btn-block text-capitalize mt-5"
                onClick={handleDeleteDone}
              >
                Delete done task
              </button>
            </Col>
            <Col sm={6} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <button
                style={buttonStyle}
                type="button"
                className="btn btn-danger btn-block text-capitalize mt-5"
                onClick={clearList}
              >
                Delete all task
              </button>
            </Col>
          </Row>
        </div>
      </ul>
    );
  }
}
