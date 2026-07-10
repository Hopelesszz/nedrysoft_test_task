import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { QuizStore } from '../store/QuizStore';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  public readonly store = inject(QuizStore);
  public isQuiz = signal<boolean>(false);
  public isFinish = signal<boolean>(false);

  constructor() {
    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (event.url.includes('finish-quiz')) {
            this.isFinish.set(true);
            this.isQuiz.set(false);
          }
          else if (event.url.includes('quiz')) {
            this.isQuiz.set(true);
            this.isFinish.set(false);
          }
          else {
            this.isQuiz.set(false);
            this.isFinish.set(false);
          }
        }
      }
    );
  }

  protected cancelQuiz () {
    this.store.isCancelPressed.set(true);
    this.store.endQuiz();
    this.store.cancelTimer();
    this.router.navigate(['/']);
  }
  protected randomQuiz() {
    const randomIndex = Math.floor(Math.random() * this.store.quizes().length);
    const quiz = this.store.quizes()[randomIndex];
    this.store.startQuiz(quiz);
    this.store.startTimer();
    this.router.navigate(['/quiz', quiz.id]);
  }
}
