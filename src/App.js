import React, { Component } from "react";
import TodoInput from "./pages/TodoInput";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import data from "./data/data.json";
import { BrowserRouter, Route, Routes } from "react-router-dom";

class App extends Component {
  state = {
    items: data,
    id: uuid(),
    item: "",
    editItem: false,
  };

  handleChange = (e) => {
    this.setState({
      item: e.target.value,
    });
  };

  //submit
  handleSubmit = (e) => {
    e.preventDefault();

    // If it's in edit mode
    if (this.state.editItem) {
      const updatedItems = this.state.items.map((item) => {
        if (item.id === this.state.id) {
          // Update the data of the item being edited
          return {
            ...item,
            task: this.state.item,
          };
        }
        return item;
      });

      this.setState({
        items: updatedItems,
        item: "",
        id: uuid(),
        editItem: false,
      });
    } else {
      // If you are in add mode
      const newItem = {
        id: this.state.id,
        task: this.state.item,
        complete: false,
      };

      const updatedItems = [...this.state.items, newItem];

      this.setState({
        items: updatedItems,
        item: "",
        id: uuid(),
        editItem: false,
      });
    }
  };

  // clear list
  clearList = () => {
    this.setState({
      items: [],
    });
  };

  // delete by id
  handleDelete = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);
    this.setState({
      items: filteredItems,
    });
  };

  // delete data done
  handleDeleteDone = () => {
    const filteredItems = this.state.items.filter(
      (item) => item.complete !== true
    );
    this.setState({
      items: filteredItems,
    });
  };

  //edit data
  handleEdit = (id) => {
    const selectedItem = this.state.items.find((item) => item.id === id);

    this.setState({
      item: selectedItem.task,
      editItem: true,
      id: id,
    });
  };

  getCompletedItems = () => {
    const completedItems = this.props.items?.filter((item) => {
      return item.complete;
    });
    return completedItems || [];
  };
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-8 mt-4">
              <Routes>
                <Route
                  exact
                  path="/"
                  component={() => (
                    <TodoList
                      items={this.state.items}
                      clearList={this.clearList}
                      handleDelete={this.handleDelete}
                      handleEdit={this.handleEdit}
                      handleCheck={this.handleCheck}
                      handleDeleteDone={this.handleDeleteDone}
                      completedItems={this.getCompletedItems()}
                    />
                  )}
                />
                <Route
                  exact
                  path="/todoinput"
                  component={() => (
                    <TodoInput
                      item={this.state.item}
                      handleChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
                      editItem={this.state.editItem}
                    />
                  )}
                />
              </Routes>
              <TodoList
                items={this.state.items}
                clearList={this.clearList}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                handleCheck={this.handleCheck}
                handleDeleteDone={this.handleDeleteDone}
                completedItems={this.getCompletedItems()}
              />
              <TodoInput
                item={this.state.item}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                editItem={this.state.editItem}
              />
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
