export const container = {
  margin: "0 auto",
  maxWidth: "1250px",
  width: "100%", 
  boxSizing: "border-box",
};

export const cardA = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Adjust columns based on available width
    color: "white",
    justifyItems: "center",
    height: "450px",
    gap: "20px",
    padding: "20px",
    alignItems: "center",
    background: "rgb(0 0 0)",
};

export const cardB = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    alignItems: "baseline", // Adjust columns based on available width
    color: "white",
    justifyItems: "center",
    gap: "20px",
    padding: "20px",
    alignItems: "center",
    background: "#26272b",
};

export const sliceA = {
    display: "flex",
    height: "300px",
    width: "100%", // Adjust width to fit column
    justifyContent: "center",
    alignItems: "center",
};

export const sliceB = {
    display: "flex",
    height: "300px",
    width: "100%", // Adjust width to fit column
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    padding: "1rem",
};

export const cardCenter = {
    display: "flex",
    height: "300px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};

export const h3Style = {
  fontSize: " 10rem",
};
