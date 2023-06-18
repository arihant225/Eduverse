import { TestBed } from '@angular/core/testing';

import { OtpServicesService } from './otp-services.service';

describe('OtpServicesService', () => {
  let service: OtpServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
