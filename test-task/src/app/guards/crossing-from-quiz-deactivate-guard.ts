import { CanDeactivateFn } from '@angular/router';
import { Quiz } from '../quiz/quiz';

export const crossingFromQuizDeactivateGuard: CanDeactivateFn<Quiz> = (component, currentRoute, currentState, nextState) => {
  const store = component.store;
  if (nextState?.url?.includes('/finish-quiz')) {
    return true;
  }
  if (store.isCancelPressed() === true) {
    store.isCancelPressed.set(false);
    return true;
  }
  return false;
};
