import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideNavComponent } from './toolbar.component';

describe('SlideNavComponent', () => {
  let component: SlideNavComponent;
  let fixture: ComponentFixture<SlideNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlideNavComponent],
    });
    fixture = TestBed.createComponent(SlideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
