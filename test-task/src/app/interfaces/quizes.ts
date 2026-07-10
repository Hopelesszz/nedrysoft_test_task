import { Question } from './questions';

export interface Quiz {
  id: number;
  name: string;
  questions: Question[];
  correctAnswersCount: number;
  wrongAnswersCount: number;
}
