import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import "../backoffice/sidepanel.css";
const SidePanel = () => {
  return (
    <ListGroup style={{ position: "relative", top: "2.6rem" }}>
      <ListGroup.Item as={Link} to="Products" className="list-item-hover">
        Product
      </ListGroup.Item>
    </ListGroup>
  );
};

export default SidePanel;
