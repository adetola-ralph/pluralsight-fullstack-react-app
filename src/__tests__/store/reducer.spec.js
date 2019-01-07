import {
  GET_GROCERY_ITEMS_SUCCESS,
  ADD_GROCERY_ITEM_SUCCEEDED,
  NEW_ITEM_UPDATE,
  DELETE_GROCERY_ITEM_SUCCEEDED,
  UPDATE_GORCERY_ITEM_SUCCEEDED,
  DELETE_GROCERY_ITEM_FAILURE,
} from '../../store/constants';
import reducer, { initialState } from '../../store/reducer';

let newInitialState;

describe('Reducer', () => {
  beforeAll(() => {
    newInitialState = {
      ...initialState,
      groceryItems: [
        { name: 'Item1', _id: 1 },
        { name: 'Item2', purchased: true, _id: 2 }
      ],
    };
  });

  it('should return the default state', () => {
    const state = reducer(undefined, { type: '' });

    expect(state).toHaveProperty('groceryItems', []);
    expect(state).toHaveProperty('errorMessage', '');
    expect(state).toHaveProperty('newItem', { name: '' });
  });

  it('should handle GET_GROCERY_ITEMS_SUCCESS action', () => {
    const action = {
      type: GET_GROCERY_ITEMS_SUCCESS,
      items: [{ name: 'Item1' }, { name: 'Item2', purchased: true }],
    };

    const state = reducer(initialState, action);

    expect(state.errorMessage).toEqual('');
    expect(state.groceryItems).toEqual(action.items);
  });

  it('should handle ADD_GROCERY_ITEM_SUCCEEDED', () => {
    const action = {
      type: ADD_GROCERY_ITEM_SUCCEEDED,
      item: { name: 'Item3' },
    };

    const state = reducer(newInitialState, action);
    expect(state.groceryItems).toContainEqual({ name: 'Item3' });
  });

  it('should handle NEW_ITEM_UPDATE', () => {
    const action = {
      type: NEW_ITEM_UPDATE,
      name: 'Item4'
    };

    const state = reducer(newInitialState, action);
    expect(state.newItem).toEqual({ name: 'Item4' });
  });

  it('should handle DELETE_GROCERY_ITEM_SUCCEEDED', () => {
    const action = {
      type: DELETE_GROCERY_ITEM_SUCCEEDED,
      item: {
        _id: 2,
      },
    };

    const state = reducer(newInitialState, action);
    expect(state.groceryItems).not.toContainEqual(newInitialState[1]);
  });

  it('should handle DELETE_GROCERY_ITEM_SUCCEEDED', () => {
    const action = {
      type: UPDATE_GORCERY_ITEM_SUCCEEDED,
      item: {
        _id: 2,
        name: 'Item22',
        purchased: true,
      },
    };

    const state = reducer(newInitialState, action);
    expect(state.groceryItems).not.toContainEqual(newInitialState[1]);
    expect(state.groceryItems).toContainEqual({ _id:2, name: 'Item22', purchased: true });
  });

  it('should handle _FAILURE actions properly', () => {
    const action = {
      type: DELETE_GROCERY_ITEM_FAILURE,
      message: 'Error message here',
    };

    const state = reducer(initialState, action);
    expect(state.errorMessage).toEqual('Error message here');
  });
});
