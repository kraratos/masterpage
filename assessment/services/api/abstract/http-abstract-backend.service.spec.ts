import { TestBed } from '@angular/core/testing';

import { HttpAbstractBackendService } from './http-abstract-backend.service';

describe('HttpAbstractBackendService', () => {
  let service: HttpAbstractBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAbstractBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
