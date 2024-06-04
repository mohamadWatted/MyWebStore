import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <button onClick={goHome}>Go Back Home</button>
    </div>
  );
};

export default ErrorPage;
