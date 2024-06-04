import React from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { updateCart } from "../../features/user-slice";
import { VscAdd } from "react-icons/vsc";
import { VscChromeMinimize } from "react-icons/vsc";

const ProductItem = ({ data }) => {
  const BtnCart = {
    marginBottom: "10px",
  };

  const styleBtnAddCart = {
    background: "white",
    color: "#0ccb36",
    border: "2px solid #0ccb36",
    borderRadius: "5px",
    width: "32px",
  };

  const styleBtnRemoveCart = {
    background: "white",
    color: "red",
    border: "2px solid red",
    borderRadius: "5px",
    width: "32px",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = (e) => {
    e.stopPropagation();
    dispatch(updateCart({ itemId: data.id, add: true }));
  };

  const removeFromCart = (e) => {
    e.stopPropagation();
    dispatch(updateCart({ itemId: data.id, add: false }));
  };

  return (
    <>
      <div
        className="btn"
        style={{ padding: "1rem" }}
        onClick={(e) => {
          navigate(`/products/${data.id}`);
        }}
      >
        <Stack>
          <Card style={{ width: "19rem", display: "flex" }}>
            {data.galleryImage?.map((image) => (
              <Card.Img
                key={image.id}
                variant="top"
                src={image.imageURL}
                alt={`${data.name} - ${image.alt}`}
              />
            ))}
            <Card.Body>
              <Card.Title>{data.name || data.productName}</Card.Title>
              <p>{data.price + " " + "$"}</p>
            </Card.Body>

            <div style={BtnCart}>
              <button style={styleBtnAddCart} onClick={addToCart}>
                <VscAdd />
              </button>

              <button style={styleBtnRemoveCart} onClick={removeFromCart}>
                <VscChromeMinimize />
              </button>
            </div>
          </Card>
        </Stack>
      </div>
    </>
  );
};

export default ProductItem;
