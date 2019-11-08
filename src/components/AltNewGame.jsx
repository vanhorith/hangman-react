import React from 'react';
import button from '../img/button.png';
import styled from 'styled-components';

const AltButton = styled.button`
  font-size: 24px;
  border: none;
  background: url(${button}) no-repeat;
  background-size: 100%;
  position: relative;
  top: 100%;
  left: 50px;
  content: '';
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: ${props => (props.newGame ? 'block' : 'none')};
  opacity: ${props => (props.newGame ? 1 : 0)};
  font-family: 'Vollkorn';
  &:after {
    display: ${props => (props.newGame ? 'none' : 'block')};
    opacity: ${props => (props.newGame ? 0 : 1)};
  }
`;

const AltNewGame = props => (
  <AltButton {...props} onClick={props.onClick}>
    New Game
  </AltButton>
);

export default AltNewGame;
