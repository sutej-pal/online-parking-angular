import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalsParkingMapComponent } from './pals-parking-map.component';

describe('PalsParkingMapComponent', () => {
  let component: PalsParkingMapComponent;
  let fixture: ComponentFixture<PalsParkingMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalsParkingMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalsParkingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
