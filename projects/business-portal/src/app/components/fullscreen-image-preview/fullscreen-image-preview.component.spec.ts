import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenImagePreviewComponent } from './fullscreen-image-preview.component';

describe('FullscreenImagePreviewComponent', () => {
  let component: FullscreenImagePreviewComponent;
  let fixture: ComponentFixture<FullscreenImagePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullscreenImagePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenImagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
