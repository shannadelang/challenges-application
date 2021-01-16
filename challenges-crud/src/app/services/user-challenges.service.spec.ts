import { TestBed } from '@angular/core/testing';

import { UserChallengesService } from './user-challenges.service';

describe('UserChallengesService', () => {
  let service: UserChallengesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserChallengesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
