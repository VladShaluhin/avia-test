import React, { Fragment } from "react";
import styled from "styled-components";

import Text from "../../components/Text";

import { getEndTime, convertTime } from "./utils.js";

const Container = styled.div`
  width: 500px;
  flex-direction: column;
  display: flex;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  padding: 26px 20px;
  align-items: center;
`;

const Price = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: #2196f3;
  width: 66%;
`;

const Body = styled.div`
  padding: 0 20px 0px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Cell = styled.div`
  flex: 0 0 33.33%;
`;

const getstopsText = stops => {
  const getstops = () => (
    <Text uppercase black>
      {stops.join(", ")}
    </Text>
  );
  switch (stops.length) {
    case 1:
      return (
        <Fragment>
          <Text uppercase>1 пересадка</Text>
          {getstops()}
        </Fragment>
      );

    case 2:
      return (
        <Fragment>
          <Text uppercase>{stops.length} пересадки</Text>
          {getstops()}
        </Fragment>
      );

    case 3:
      return (
        <Fragment>
          <Text uppercase>{stops.length} пересадки</Text>
          {getstops()}
        </Fragment>
      );

    default:
      return <Text uppercase>Без пересадок</Text>;
  }
};

const ListItem = ({ ticket }) => {
  const { segments } = ticket;
  return (
    <Container>
      <Header>
        <Price>{ticket.price} P</Price>
        <img
          src={`http://pics.avs.io/99/36/${ticket.carrier}.png`}
          alt="logo"
        />
      </Header>
      <Body>
        {segments.map((i, index) => {
          const time = convertTime(i.duration);
          const end = getEndTime(i.date, i.duration);
          return (
            <Row key={index}>
              <Cell>
                <Text uppercase>
                  {i.origin} - {i.destination}
                </Text>
                <Text black uppercase>{`${new Date(
                  i.date
                ).getHours()}:${new Date(i.date).getMinutes()} - ${end.h}:${
                  end.m
                }`}</Text>
              </Cell>
              <Cell>
                <Text uppercase>В пути</Text>
                <Text black>
                  {time.h}ч {time.m}м
                </Text>
              </Cell>
              <Cell>{getstopsText(i.stops)}</Cell>
            </Row>
          );
        })}
      </Body>
    </Container>
  );
};

export default ListItem;
