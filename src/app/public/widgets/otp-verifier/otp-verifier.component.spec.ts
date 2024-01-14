import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerifierComponent } from './otp-verifier.component';

describe('OtpVerifierComponent', () => {
  let component: OtpVerifierComponent;
  let fixture: ComponentFixture<OtpVerifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpVerifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpVerifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
