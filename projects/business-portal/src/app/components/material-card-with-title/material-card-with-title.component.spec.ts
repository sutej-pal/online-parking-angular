import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCardWithTitleComponent } from './material-card-with-title.component';

describe('MaterialCardWithTitleComponent', () => {
  let component: MaterialCardWithTitleComponent;
  let fixture: ComponentFixture<MaterialCardWithTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialCardWithTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialCardWithTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
