import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatLngPickerComponent } from './lat-lng-picker.component';

describe('LatLngPickerComponent', () => {
  let component: LatLngPickerComponent;
  let fixture: ComponentFixture<LatLngPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatLngPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatLngPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
