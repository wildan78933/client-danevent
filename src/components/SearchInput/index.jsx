import React from "react";
import { Form } from "react-bootstrap";

function SearchInput({ handleChange, query, disabled }) {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        // style={{ zIndex: 1 }} // Add this line
        disabled={disabled}
        type="text"
        placeholder="Masukan pencarian disini"
        value={query}
        name="query"
        onChange={handleChange}
      />
    </Form.Group>
  );
}

export default SearchInput;
