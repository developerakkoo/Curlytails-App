import { TestBed } from '@angular/core/testing';

import { CommenServiceService } from './Commen-service.service';

describe('BannerServiceService', () => {
  let service: CommenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
