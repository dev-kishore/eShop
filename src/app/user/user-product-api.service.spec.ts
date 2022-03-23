import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserProductApiService } from './user-product-api.service';

describe('UserProductApiService', () => {
  let service: UserProductApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule]});
    service = TestBed.inject(UserProductApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
