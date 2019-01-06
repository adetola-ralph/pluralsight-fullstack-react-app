import Enzyme from 'enzyme';

import { AddGroceryListItem } from '../../components/AddGroceryListItem';

const { shallow } = Enzyme;
const newItem = {
  name: '',
};
const onAddItem = jest.fn();
const onNameChange = jest.fn();

let wrapper;

const props = {
  onAddItem,
  onNameChange,
  newItem,
};

describe('AddGroceryListItem component', () => {
 it('trigger onNameChange when the input is changed', () => {
  wrapper = shallow(<AddGroceryListItem {...props} />);
  const inputField = wrapper.find('input');
  inputField.simulate('change');
  expect(onNameChange).toHaveBeenCalled();
 });

 it('trigger onAddItem when the form is submitted', () => {
  wrapper = shallow(<AddGroceryListItem {...props} />);
  const form = wrapper.find('form');
  form.simulate('submit', { preventDefault: jest.fn() });
  expect(onAddItem).toHaveBeenCalled();
 });
});
