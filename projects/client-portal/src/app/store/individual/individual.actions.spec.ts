import * as fromIndividual from './individual.actions';

describe('loadIndividuals', () => {
  it('should return an action', () => {
    expect(fromIndividual.loadIndividual().type).toBe('[Individual] Load Individuals');
  });
});
