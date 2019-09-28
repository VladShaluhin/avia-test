import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: ${props => (props.black ? "14px" : "12px")};
  line-height: 18px;
  color: ${props => (props.black ? "#4A4A4A" : "#A0B0B9")};
  text-transform: ${props => (props.uppercase ? "uppercase" : "none")};;
`;

const Text = ({ black, children, uppercase }) => (
  <Container black={black} uppercase={uppercase}>{children}</Container>
);

export default Text;
