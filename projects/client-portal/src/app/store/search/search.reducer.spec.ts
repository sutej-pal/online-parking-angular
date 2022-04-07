import { searchReducer, initialState } from './search.reducer';

describe('Search Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = searchReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
