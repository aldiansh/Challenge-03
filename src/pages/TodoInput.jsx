import React from "react";
import { Row, Col } from "react-bootstrap";

const TodoInput = ({ item, handleChange, handleSubmit, editItem }) => {
  return (
    <div className="card card-body my-3">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <Row>
            <Col>
              <h3 className="text-capitalize text-center">Todo Input</h3>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-info text-white">
                    <i className="fas fa-book fa-2x" />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control text-capitalize"
                  placeholder="Input/Edit Todo"
                  value={item}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <button
              type="submit"
              className="btn btn-block btn-info text-white mt-3"
            >
              {editItem ? "Edit" : "Submit"}
            </button>
          </Row>
        </div>
      </form>
    </div>
  );
};

export default TodoInput;
