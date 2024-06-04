import { useState, useEffect } from "react";
import api from "../../utils/api";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";

const BackOfficeList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("product")
      .then((result) => setItems(result.data))
      .catch((ex) => console.error(ex));
  }, []);

  const handleDelete = (id) => {
    api
      .delete(`product/${id}`)
      .then(() => setItems(items.filter((item) => item.id !== id)))
      .catch((ex) => console.error(ex));
  };

  return (
    <>
      <h3>ProductList</h3>
      <Button variant="outline-success" as={Link} to="/backoffice/products/new">
        <FaPlus /> Add new product
      </Button>
      <br />
      <Table striped bordered style={{position:"relative",top:"1rem"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>AddOn</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <img
                  style={{ height: "80px", display: "flex" }}
                  src={p.galleryImage[0].imageURL}
                  alt={p.galleryImage[0].alt}
                />
              </td>
              <td>{p.productName}</td>
              <td>{p.price}</td>
              <td>{new Date(p.addedOn).toLocaleDateString()}</td>
              <td
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "7rem",
                }}
              >
                <Button
                  variant="outline-warning"
                  as={Link}
                  to={`/backoffice/products/edit/${p.id}`}
                >
                  <HiOutlinePencilSquare />
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  <IoTrashOutline />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default BackOfficeList;