import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  background: red;
  z-index: 100;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  padding: 15px;
  color: white;
  text-transform: uppercase;
  min-width: 300px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 20px;
  border-radius: 5px;
  background: ${props => (props.error ? "red" : "green")};
`;

const Message = ({ text, error, onClose }) => {
  useEffect(() => {
    setTimeout(onClose, 3000);
  });
  return <Container error={error}>{text}</Container>;
};

export default Message;
