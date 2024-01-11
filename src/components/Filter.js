import React from "react";
import { Dropdown } from "react-bootstrap";

const Filter = (props) => {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">{props.title}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="?"> Option 1</Dropdown.Item>
          <Dropdown.Item href="?"> Option 2</Dropdown.Item>
          <Dropdown.Item href="?"> Option 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Filter;
