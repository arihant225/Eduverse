import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanSliderComponent } from './boolean-slider.component';

describe('BooleanSliderComponent', () => {
  let component: BooleanSliderComponent;
  let fixture: ComponentFixture<BooleanSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooleanSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooleanSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
