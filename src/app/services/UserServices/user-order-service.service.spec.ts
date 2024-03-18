import { TestBed } from '@angular/core/testing';

import { UerOrderServiceService } from './user-order-service.service';

describe('UerOrderServiceService', () => {
  let service: UerOrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UerOrderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
