import { Component, effect, inject } from '@angular/core';
import { QuizStore } from '../store/QuizStore';
import { Quiz } from '../interfaces/quizes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home {
  public readonly store = inject(QuizStore);
  private readonly router = inject(Router);

  protected startQuiz (quiz: Quiz) {
    this.store.startQuiz(quiz);
    this.store.startTimer();
    this.router.navigate(['/quiz', quiz.id]);
  }
}
