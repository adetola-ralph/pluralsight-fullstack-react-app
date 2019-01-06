import React from 'react';
import Enzyme, { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.React = React;
global.Enzyme = Enzyme;
