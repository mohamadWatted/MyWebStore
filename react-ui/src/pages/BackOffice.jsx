import { Outlet, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import SidePanel from "../components/backoffice/SidePanel";

const BackOffice = () => {
  const navigate = useNavigate();

  const handleEvent = () => {
    navigate("/");
  };

  return (
    <>
      <Container >
          <h2>Welcome to the Back Office</h2>
          <Button variant="danger" onClick={handleEvent}>
            Return Home Page
          </Button>
          <Row>
            <Col md={3}>
              <SidePanel />
            </Col>
            <Col md={9}>
              <Outlet />
            </Col>
          </Row>
      </Container>
    </>
  );
};

export default BackOffice;
