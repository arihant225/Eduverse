import { TestBed } from '@angular/core/testing';

import { OtpService } from './otp-services.service';

describe('OtpServicesService', () => {
  let service: OtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
