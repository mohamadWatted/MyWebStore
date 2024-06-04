import { useEffect } from "react";

const LogoComponents = () => {
  const stylecontainerLogo = {
    display: "flex",
    alignItems: "center",
  };

  const styleLogo = {
    height: "5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={stylecontainerLogo}>
      <div style={styleLogo}>
        <div
          style={{
            fontSize: "5rem",
            position: "relative",
            bottom: "1rem",
          }}
        >
          o
        </div>
        <div>o</div>
      </div>

      <h2>MyShop</h2>
    </div>
  );
};

export default LogoComponents;
