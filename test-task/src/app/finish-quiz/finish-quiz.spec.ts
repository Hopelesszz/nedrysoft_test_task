import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishQuiz } from './finish-quiz';

describe('FinishQuiz', () => {
  let component: FinishQuiz;
  let fixture: ComponentFixture<FinishQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishQuiz],
    }).compileComponents();

    fixture = TestBed.createComponent(FinishQuiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
