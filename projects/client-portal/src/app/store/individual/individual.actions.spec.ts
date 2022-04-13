import * as fromIndividual from './individual.actions';

describe('loadIndividuals', () => {
  it('should return an action', () => {
    expect(fromIndividual.loadIndividuals().type).toBe('[Individual] Load Individuals');
  });
});
