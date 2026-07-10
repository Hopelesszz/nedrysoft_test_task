import { Routes } from '@angular/router';
import { Home } from './home/home';
import { FinishQuiz } from './finish-quiz/finish-quiz';
import { Quiz } from './quiz/quiz';
import { crossingFromQuizDeactivateGuard } from './guards/crossing-from-quiz-deactivate-guard';
import { crossingFromFinishQuizDeactivateGuard } from './guards/crossing-from-finish-quiz-deactivate-guard';
import { quizGuardGuard } from './guards/quiz-guard-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'finish-quiz', component: FinishQuiz, canDeactivate: [crossingFromFinishQuizDeactivateGuard] },
  { path: 'quiz/:id', component: Quiz, canDeactivate: [crossingFromQuizDeactivateGuard], canActivate: [quizGuardGuard] },
];
