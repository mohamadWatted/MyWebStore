import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../features/auth-slice"; // Import your registerUser action
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormContainer, OverlayContainer } from "../login/LoginFromStyle";
import Swal from "sweetalert2";
import ValidationRegister from "./ValidationRegister";

function RegistrationForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    emailaddress: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = ValidationRegister(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await dispatch(registerUser(formData));
        Swal.fire({
          title: "Registration successful!",
          icon: "success",
          confirmButtonText: "Cool",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops... There was an error!",
          text: "Something went wrong!",
        });
        console.error("Registration error:", error.message);
      }
    }
  };

  return (
    <OverlayContainer>
      <FormContainer>
        <h2>Register</h2>
        <Form onSubmit={handleSubmit} style={{ width: " 27rem" }}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First name:</Form.Label>
            <Form.Control
              type="text"
              name="firstname" // Removed id="firstname"
              value={formData.firstname}
              onChange={handleChange}
              isInvalid={!!errors.firstname}
              autoComplete="firstname"
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstname}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last name:</Form.Label>
            <Form.Control
              type="text"
              name="lastname" // Removed id="lastname"
              value={formData.lastname}
              onChange={handleChange}
              isInvalid={!!errors.lastname}
              autoComplete="lastname"
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastname}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Label>User name:</Form.Label>
            <Form.Control
              type="text"
              name="username" // Removed id="username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
              autoComplete="username"
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="email"
              name="emailaddress" // Removed id="emailaddress"
              value={formData.emailaddress}
              onChange={handleChange}
              isInvalid={!!errors.emailaddress}
            />
            <Form.Control.Feedback type="invalid">
              {errors.emailaddress}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password" // Removed id="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Add more form fields for user registration */}
          <Button variant="danger" type="submit" style={{ width: "27rem" }}>
            Register
          </Button>
        </Form>
      </FormContainer>
    </OverlayContainer>
  );
}

export default RegistrationForm;
