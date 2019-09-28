import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    border: 2px solid #2196F3;
    position: fixed;
    right: 50px;
    bottom: 50px;
    border-radius: 50%;
    
    &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        cursor: pointer
    }
`;

const Arrow = styled.div`
    width: 0; 
    height: 0; 
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;

    border-bottom: 10px solid #2196F3;
    margin: auto;
`;

const Totop = () => <Container onClick={()=>window.scrollTo(0,0)}><Arrow /></Container>

export default Totop;