import Enzyme from 'enzyme';

import { GroceryItem } from '../../components/GroceryItem';

const { shallow } = Enzyme;
const item = {
  name: 'Okra',
  _id: '123'
};
const deleteItem = jest.fn();
const togglePurchase = jest.fn();

let wrapper;

const props = {
  deleteItem,
  togglePurchase,
  item,
};

describe('GroceryItem component', () => {
  it('trigger deleteItem when the delete button is clicked', () => {
    wrapper = shallow(<GroceryItem {...props} />);
    const deleteButton = wrapper.find('button.delete');
    deleteButton.simulate('click');
    expect(deleteItem).toHaveBeenCalled();
  });

  it('trigger togglePurchase when the togglePurchase button is clicked', () => {
    wrapper = shallow(<GroceryItem {...props} />);
    const purchaseButton = wrapper.find('button.purchase');
    purchaseButton.simulate('click');
    expect(togglePurchase).toHaveBeenCalled();
  });

  it('should show buy when purchased is false', () => {
    wrapper = shallow(<GroceryItem {...props} />);
    const purchaseButton = wrapper.find('button.purchase');
    expect(purchaseButton.text()).toEqual('Buy');
  });

  it('should show unbuy when purchased is false', () => {
    wrapper = shallow(<GroceryItem {...props} item={{ ...item, purchased: true }}/>);
    const purchaseButton = wrapper.find('button.purchase');
    expect(purchaseButton.text()).toEqual('Unbuy');
  });
});
