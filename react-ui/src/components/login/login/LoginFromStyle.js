// src/LoginFormStyles.js
import styled from "@emotion/styled";

export const OverlayContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  position: relative;
  top: 4rem;
`;

export const FormContainer = styled.div`
  background: white;
  padding: 38px;
  border-radius: 2px;
  border: solid black 0.2px;
  background-color: #f5f5f5;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input`
  padding: 6px;
  width: 17rem;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const StyledButtonRegister = styled.button`
  width: 8.2rem;
  padding: 10px;
  border: none;
  border-radius: 0 4px 4px 0;
  background-color: #c4c0c0;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
`;

export const StyledButtonSignIn = styled.button`
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 4px 0 0 4px;
  background-color: #4c75a0;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #007bff;
  }
`;

export const ContainerBtn = styled.div`
  display: flex;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;
