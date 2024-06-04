import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
const WelcomeComponent = () => {
  const styleBtnBckOffice = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "grey",
    height: "30rem",
    color: "white",
  };
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handlePrivateArea = () => {
    if (user) {
      if (user.type === 999) {
        navigate("/backoffice");
      } else {
        navigate("/cart");
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="animated-background" style={styleBtnBckOffice}>
      <h3>Welcome to my store</h3>
      {user && user.type === 999 ? (
        <Button
          variant="danger"
          className="heartbeat-button"
          onClick={handlePrivateArea}
        >
          Back Office
        </Button>
      ) : null}
    </div>
  );
};

export default WelcomeComponent;
