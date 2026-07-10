import { FinishQuiz } from '../finish-quiz/finish-quiz';
import { CanDeactivateFn } from '@angular/router';

export const crossingFromFinishQuizDeactivateGuard: CanDeactivateFn<FinishQuiz> = (component, currentRoute, currentState, nextState) => {
  if (nextState?.url === '/' || nextState?.url === '') {
    const store = component.store;
    store.elapsedTime.set(0);
    store.endQuiz();
    return true;
  }
  return false;
};
