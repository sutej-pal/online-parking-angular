import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLotDetailsComponent } from './parking-lot-details.component';

describe('ParkingLotDetailsComponent', () => {
  let component: ParkingLotDetailsComponent;
  let fixture: ComponentFixture<ParkingLotDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingLotDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingLotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
