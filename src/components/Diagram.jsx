import React from 'react';
import hang8 from '../img/hang8.png';
import hang7 from '../img/hang7.png';
import hang6 from '../img/hang6.png';
import hang5 from '../img/hang5.png';
import hang4 from '../img/hang4.png';
import hang3 from '../img/hang3.png';
import hang2 from '../img/hang2.png';
import hang1 from '../img/hang1.png';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 295px;
  height: 295px;
  background: url(${hang8}) no-repeat center center;
  background-size: 100%;
  margin: 0 15px;
  display: ${props => (props.newGame ? 'block' : 'none')};
  opacity: ${props => (props.newGame ? 1 : 0)};
  transition: all 0.3s linear;
  &[data-order='2']{
    background-image: url(${hang7});
  }
  &[data-order='3']{
    background-image: url(${hang6});
  }
  &[data-order='4']{
    background-image: url(${hang5});
  }
  &[data-order='5']{
    background-image: url(${hang4});
  }
  &[data-order='6']{
    background-image: url(${hang3});
  }
  &[data-order='7']{
    background-image: url(${hang2});
  }
  &[data-order='8']{
    background-image: url(${hang1});
  }
`;
const Board = props => (
  <Wrapper {...props} data-order={props.currentDiagram} className="board" />
);

export default Board;
