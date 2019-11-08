import React from 'react';
import winImage from '../img/gameWon.png';
import loseImage from '../img/gameLost.png';
import styled from 'styled-components';

const Text = styled.p`
  display: ${props => (props.newGame ? 'none' : 'block')};
  font-size: 25px;
  max-width: 200px;
  position: center;
  margin: 0;
  padding-right: 200px;
  &:after {
    content: '';
    width: ${props => (props.isLose ? '300px' : '300px')};
    height: ${props => (props.isLose ? '180px' : '180px')};
    background-repeat: no-repeat;
    display: inline-block;
    background-size: 100%;
    margin-top: 125px;
    position: center;
    padding-left: 150px
    background-image: ${props =>
      props.isLose ? `url(${loseImage})` : `url(${winImage})`};
  }
`;

const GameOver = props => <Text {...props}>{props.text}</Text>;

export default GameOver;
