import { TestBed } from '@angular/core/testing';

import { RoleModeratorGuard } from './role-moderator.guard';

describe('RoleModeratorGuard', () => {
  let guard: RoleModeratorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleModeratorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
