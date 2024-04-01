import { TestBed } from '@angular/core/testing';

import { UserFormDetailsService } from './user-form-details.service';

describe('UserFormDetailsService', () => {
  let service: UserFormDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFormDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
