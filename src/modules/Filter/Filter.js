import React  from "react";
import styled from "styled-components";

import Checkbox from "../../components/Checkbox";

const Container = styled.div`
  width: 230px;
  flex-direction: column;
  background: #ffffff;
  border-radius: 5px;
`;

const Filter = (props) => (
  <Container>
    <Checkbox
      handleCheck={props.handleAllCheck}
      value="Все"
      isChecked={props.allChecked}
    />
    {props.stops.map((stop, index) => {
      return (
        <Checkbox key={index} handleCheck={props.handleCheck} {...stop} />
      );
    })}
  </Container>
);

export default Filter;
