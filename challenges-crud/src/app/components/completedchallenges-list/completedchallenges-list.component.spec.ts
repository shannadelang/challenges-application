import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedchallengesListComponent } from './completedchallenges-list.component';

describe('CompletedchallengesListComponent', () => {
  let component: CompletedchallengesListComponent;
  let fixture: ComponentFixture<CompletedchallengesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedchallengesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedchallengesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
