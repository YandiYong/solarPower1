import { TestBed } from '@angular/core/testing';

import { ApiCallServicesService } from './api-call-services.service';

describe('ApiCallServicesService', () => {
  let service: ApiCallServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCallServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
