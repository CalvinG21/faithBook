import React from 'react';
import AboutUs from '../components/AboutUs';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
const tree = renderer
.create(<AboutUs ></AboutUs>)
.toJSON();
expect(tree).toMatchSnapshot();
})























