import { TestBed } from '@angular/core/testing';

import { ChecLoginGuard } from './chec-login.guard';

describe('ChecLoginGuard', () => {
  let guard: ChecLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChecLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
