import React from "react";
import styled from "styled-components";

import Button from "../../components/Button";

const Container = styled.div`
  width: 500px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border-radius: 5px;
  display: flex;
`;

const Sort = ({ price, onClick }) => (
  <Container>
    <Button primary={price} left onClick={() => onClick(true)}>
      самый дешевый
    </Button>
    <Button primary={!price} right onClick={() => onClick(false)}>
      самый быстрый
    </Button>
  </Container>
);

export default Sort;
