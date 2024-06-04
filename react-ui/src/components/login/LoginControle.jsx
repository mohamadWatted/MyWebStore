import React from "react";
import LoginDeshboard from "./login/LoginDeshboard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const LoginControle = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <LoginDeshboard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginControle;
