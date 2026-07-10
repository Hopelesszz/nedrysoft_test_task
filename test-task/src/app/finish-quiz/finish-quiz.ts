import { Component, inject, signal } from '@angular/core';
import { QuizStore } from '../store/QuizStore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish-quiz',
  templateUrl: './finish-quiz.html',
  styleUrl: './finish-quiz.scss',
})
export class FinishQuiz {
  public readonly store = inject(QuizStore);
  private readonly router = inject(Router);
  public resultTimer = signal<string>("");

  constructor () {
    this.store.endTimer();
    const totalSeconds = Math.floor(this.store.elapsedTime() / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    this.resultTimer.set(`${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`)
  }

  public backToHome () {
    this.router.navigate(['/']);
  }
}
