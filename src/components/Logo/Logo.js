import React from "react";
import logo from "./img.png";

import styled from "styled-components";

const Container = styled.div`
  width: 60px;
  height: 60px;
  margin: auto;

  img {
    &:hover {
        cursor: pointer;
    }
  }
`;

const Logo = ({ onClick }) => (
  <Container onClick={onClick}>
    <img src={logo} alt="Logo" />
  </Container>
);

export default Logo;
