import { TestBed } from '@angular/core/testing';

import { CompletedChallengesService } from './completed-challenges.service';

describe('CompletedChallengesService', () => {
  let service: CompletedChallengesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedChallengesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
