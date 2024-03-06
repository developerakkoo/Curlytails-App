import { TestBed } from '@angular/core/testing';

import { ErrorServicesService } from './error.services.service';

describe('ErrorServicesService', () => {
  let service: ErrorServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
