import Enzyme from 'enzyme';

import { GroceryItemList } from '../../components/GroceryItemList';

const { shallow } = Enzyme;
const items= [
  {
    name: 'Okra',
    _id: '123'
  },
  {
    name: 'Beans',
    _id: '234'
  },
  {
    name: 'Rice',
    _id: '345'
  },
];
const onAddItem = jest.fn();
const deleteItem = jest.fn();
const onNameChange = jest.fn();
const togglePurchase = jest.fn();
const newItem = {
  name: '',
};

let wrapper;

const props = {
  items,
  newItem,
  onAddItem,
  deleteItem,
  onNameChange,
  togglePurchase,
};

describe('GroceryItemList component', () => {
 it('should render GroceryList component correctly', () => {
  wrapper = shallow(<GroceryItemList {...props} />);
  const groceryItemComponent = wrapper.find('GroceryItem');
  expect(groceryItemComponent).toHaveLength(3);
  const addGroceryListItemComponent = wrapper.find('AddGroceryListItem');
  expect(addGroceryListItemComponent).toHaveLength(1);
 });
});
