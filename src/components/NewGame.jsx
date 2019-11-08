import React from 'react';
import button from '../img/button.png';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 24px;
  border: none;
  background: none;
  position: relative;
  cursor: pointer;
  display: ${props => (props.newGame ? 'none' : 'block')};
  opacity: ${props => (props.newGame ? 0 : 1)};
  font-family: 'Vollkorn';
  &:after {
    content: '';
    width: 36px;
    height: 36px;
    position: absolute;
    background: url(${button}) no-repeat;
    background-size: 100%;
    top: 100%;
    left: 50px;
  }
`;

const NewGame = props => (
  <Button {...props} onClick={props.onClick}>
    Try Again?
  </Button>
);

export default NewGame;
