import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  OverlayContainer,
  FormContainer,
  StyledForm,
  StyledInput,
  StyledButtonRegister,
  StyledButtonSignIn,
  ContainerBtn,
  ErrorMessage,
} from "./LoginFromStyle";
import api from "../../../utils/api";
import ValidationLogin from "./ValidationLogin";

function LoginDashboard() {
  const [formData, setFormData] = useState({
    emailaddress: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = ValidationLogin(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const { emailaddress, password } = formData;

        const loginData = { emailaddress, password };

        api
          .post("login", loginData)
          .then((result) => {
            if (result.status === 200) {
              localStorage.setItem("mywebsite_token", result.data);
              nav("/login_transition");
            } else {
              throw new Error(`Could not login (${result.status})`);
            }
          })
          .catch((ex) => {
            localStorage.removeItem("mywebsite_token");
            setError(ex.message);
            console.error(ex);
          });
      } catch (validationError) {
        setError(validationError.message);
      }
    }
  };

  return (
    <OverlayContainer inlist="someStringValue">
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <h2>Login</h2>
          <StyledInput
            type="email"
            name="emailaddress" // Added name attribute
            placeholder="Email"
            onChange={handleChange}
            value={formData.emailaddress}
            isInvalid={!!errors.emailaddress}
          />
          {errors.emailaddress && (
            <ErrorMessage>{errors.emailaddress}</ErrorMessage>
          )}
          <StyledInput
            type="password"
            name="password" // Added name attribute
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            isInvalid={!!errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <ContainerBtn>
            <StyledButtonSignIn type="submit">SIGN IN</StyledButtonSignIn>
            <Link to="/registerFrom">
              <StyledButtonRegister type="submit">
                REGISTER
              </StyledButtonRegister>
            </Link>
          </ContainerBtn>
        </StyledForm>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </OverlayContainer>
  );
}

export default LoginDashboard;
