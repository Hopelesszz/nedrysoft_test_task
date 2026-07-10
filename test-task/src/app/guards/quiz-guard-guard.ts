import { CanActivateFn } from '@angular/router';
import { QuizStore } from '../store/QuizStore';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const quizGuardGuard: CanActivateFn = (route, state) => {
  const store = inject(QuizStore);
  const router = inject(Router);

  return store.startedQuiz() ? true : router.createUrlTree(['/']);
};
