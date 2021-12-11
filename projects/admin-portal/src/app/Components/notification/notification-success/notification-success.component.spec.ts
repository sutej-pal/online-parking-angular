import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSuccessComponent } from './notification-success.component';

describe('NotificationSuccessComponent', () => {
  let component: NotificationSuccessComponent;
  let fixture: ComponentFixture<NotificationSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
