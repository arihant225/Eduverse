import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupbodyComponent } from './popupbody.component';

describe('PopupbodyComponent', () => {
  let component: PopupbodyComponent;
  let fixture: ComponentFixture<PopupbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupbodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
