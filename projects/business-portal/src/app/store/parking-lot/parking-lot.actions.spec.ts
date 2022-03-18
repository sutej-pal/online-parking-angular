import * as fromParkingLot from './parking-lot.actions';

describe('loadParkingLots', () => {
  it('should return an action', () => {
    expect(fromParkingLot.loadParkingLots().type).toBe('[ParkingLot] Load ParkingLots');
  });
});
