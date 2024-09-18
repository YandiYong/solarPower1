import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputApplComponent } from './input-appl.component';

describe('InputApplComponent', () => {
  let component: InputApplComponent;
  let fixture: ComponentFixture<InputApplComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputApplComponent]
    });
    fixture = TestBed.createComponent(InputApplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
