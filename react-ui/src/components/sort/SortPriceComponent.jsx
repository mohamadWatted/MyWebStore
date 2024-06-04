import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap"; // Corrected import statement
import { sortProductByPrice } from "../../features/product-slice"; // Adjust the path as necessary

const SortPriceComponent = () => {
  const styleSort = {
    width: "149px",
    marginLeft: "12px",
  };

  const dispatch = useDispatch();
  useSelector((state) => state.data.searchResults);

  const handleSortChange = (e) => {
    dispatch(sortProductByPrice(e.target.value));
  };

  return (
    <div style={styleSort}>
      <Form>
        <Form.Group controlId="sortPriceSelect">
          <Form.Label>Sort price</Form.Label>
          <Form.Control as="select" onChange={handleSortChange}>
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SortPriceComponent;
