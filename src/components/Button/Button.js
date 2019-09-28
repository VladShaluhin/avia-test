import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  background: transparent;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  border: none;
  color: ${props => (props.primary ? "#FFFFFF" : "#2196F3")};
  border-top-left-radius: ${props => (props.left ? "5px" : "0")};
  border-bottom-left-radius: ${props => (props.left ? "5px" : "0")};
  border-top-right-radius: ${props => (props.right ? "5px" : "0")};
  border-bottom-right-radius: ${props => (props.right ? "5px" : "0")};
  background: ${props => (props.primary ? "#2196F3" : "#FFFFFF")};
  margin: 0;
  padding: 15px;
  width: 138px;
  height: 50px;
  flex: 1;
  text-transform: uppercase;
  &:hover {
    background: ${props => (props.primary ? "#FFFFFF" : "#2196F3")};
    color: ${props => (props.primary ? "#2196F3" : "#FFFFFF")};
  }
`;

const Button = props => (
  <StyledButton
    left={props.left}
    right={props.right}
    primary={props.primary}
    onClick={props.onClick}
  >
    {props.children}
  </StyledButton>
);

export default Button;
