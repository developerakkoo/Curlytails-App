import { TestBed } from '@angular/core/testing';

import { GetproductServiceService } from './getproduct-service.service';

describe('GetproductServiceService', () => {
  let service: GetproductServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetproductServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
