import * as fromSearch from './search.actions';

describe('loadSearch', () => {
  it('should return an action', () => {
    expect(fromSearch.loadSearch().type).toBe('[Search] Load Searchs');
  });
});
