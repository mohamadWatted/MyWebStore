import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "../components/css/ProductDetails.css"; // Import your CSS file for styling

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const numberId = parseInt(id);

  const { data, status } = useSelector((state) => state.data);
  const product = data.find((product) => product.id === numberId);

  const handleBack = () => {
    navigate("/");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <Navigate to={"/errorPage"} />;
  }

  return (
    <div
      className="product-details-container"
      style={{ position: "relative", top: "4rem" }}
    >
      <h3>Details product</h3>
      <button
        className="btn btn-primary"
        style={{ width: "12rem", margin: "1rem" }}
        onClick={handleBack}
      >
        Back
      </button>
      <div className="product-details-content">
        <img
          className="img-container"
          src={product.galleryImage[0].imageURL}
          alt={product.productName}
        />
        <div className="product-details-info">
          <h3>{product.productName}</h3>
          <p>{product.description}</p>
          <div>{product.price + " " + "$"}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
