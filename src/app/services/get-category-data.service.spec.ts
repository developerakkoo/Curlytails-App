import { TestBed } from '@angular/core/testing';

import { GetCategoryDataService } from './get-category-data.service';

describe('GetCategoryDataService', () => {
  let service: GetCategoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCategoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
