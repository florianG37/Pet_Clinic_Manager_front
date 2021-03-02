import { TestBed } from '@angular/core/testing';

import { BasicAuthHtppInterceptService } from './basic-auth-htpp-intercept.service';

describe('BasicAuthHtppInterceptService', () => {
  let service: BasicAuthHtppInterceptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicAuthHtppInterceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
