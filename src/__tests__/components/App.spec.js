import Enzyme from 'enzyme';
import { connect } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { App, mapStateToProps, mapDispatchToProps } from '../../App';

const { shallow } = Enzyme;
const groceryItems = [
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
const dispatch = jest.fn();
const errorMessage = '';

const newItem = {
  name: '',
};

let wrapper;

const props = {
  newItem,
  dispatch,
  errorMessage,
  groceryItems,
};

describe('App component', () => {
  it('should render App component correctly', () => {
    wrapper = shallow(<App {...props} />);
    expect(wrapper.find('GroceryItemList')).toHaveLength(1);
  });

  it('should call dispatch onNameChange event', () => {
    wrapper = shallow(<App {...props} />);
    const groceryItemListComponent = wrapper.find('GroceryItemList');
    groceryItemListComponent.simulate('nameChange', { target: { value: 'value' } });
    expect(dispatch).toHaveBeenCalledWith({ name: 'value', type: 'NEW_ITEM_UPDATE', });
  });

  it('should render error message if it exists', () => {
    wrapper = shallow(<App {...props} errorMessage={'Test error message'} />);
    let errorMessageComponent = wrapper.find('.error-message');
    expect(errorMessageComponent).toHaveLength(1);
    expect(errorMessageComponent.text()).toEqual('Test error message');

    wrapper.setProps({ 'errorMessage': '' });
    errorMessageComponent = wrapper.find('.error-message');
    expect(errorMessageComponent).toHaveLength(0);
  });

  it('mapStateToProps', () => {
    const state = {
      newItem: {
        name: 'new item',
      },
      groceryItems,
      errorMessage: 'Test Error message',
    };

    expect(mapStateToProps(state)).toEqual(state);
  });

  it('mapStateToProps', () => {
    expect(mapDispatchToProps(dispatch)).toEqual({ dispatch });
  });
});
