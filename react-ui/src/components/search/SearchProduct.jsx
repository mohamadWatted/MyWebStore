import { useState } from "react";
import { useDispatch } from "react-redux";
import { dataFilter } from "../../features/product-slice";
import { Form } from "react-bootstrap";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchTerm(text);
    dispatch(dataFilter(text));
  };

  return (
    <Form inline="true" style={{ padding: "3.5px", marginRight: "5px" }}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginRight: "1px", height: "34px" }}
      />
    </Form>
  );
};

export default SearchProduct;
