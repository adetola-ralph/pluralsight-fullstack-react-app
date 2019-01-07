import reducer, { initialState } from '../../store/reducer';
import configureStore from '../../store/index';

jest.mock('../../store/reducer');
reducer.mockImplementation(() => ({
  ...initialState,
}));

describe('Configure store', () => {
  test('store creation', () => {
    const store = configureStore();
    expect(reducer).toHaveBeenCalled();
    expect(store.getState()).toEqual(initialState);
  });
});
