import React from "react";
import styled from "styled-components";

export const ErrorMessage = ({ children }) => {
  return <ErrorMessageComponent>{children}</ErrorMessageComponent>;
};
const ErrorMessageComponent = styled.p`
  position: absolute;
  left: 15px;
  top: 45px;
  color: red;
  font-size: 14px;
  width: 100%;
  text-align: start;
  font-family: sans-serif;
`;
