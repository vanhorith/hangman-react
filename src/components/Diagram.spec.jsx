import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Board from './Board';

describe('Board', () => {
  it('should render the component', () => {
    const wrapper = shallow(<Board />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
