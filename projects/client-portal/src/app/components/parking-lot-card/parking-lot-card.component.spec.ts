import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLotCardComponent } from './parking-lot-card.component';

describe('ParkingLotCardComponent', () => {
  let component: ParkingLotCardComponent;
  let fixture: ComponentFixture<ParkingLotCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingLotCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingLotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
