import { Component, inject, effect, signal } from '@angular/core';
import { QuizStore } from '../store/QuizStore';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  imports: [FormsModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz{
  public readonly store = inject(QuizStore);
  private readonly router = inject(Router);
  public userAnswer = signal<string>("");

  protected answerHandle () {
    if (!this.userAnswer()) {
      alert('Choose an answer');
      return;
    }
    const correctAnswerCount = this.store.correctAnswerCount();
    const startedQuizQuestionIndex = this.store.startedQuizQuestionIndex();
    const wrongAnswerCount = this.store.wrongAnswerCount();

    if(this.userAnswer() === this.store.startedQuiz()?.questions[this.store.startedQuizQuestionIndex()].correct_answer) {
      this.store.correctAnswerCount.set(correctAnswerCount + 1);
    }
    else {
      this.store.wrongAnswerCount.set(wrongAnswerCount + 1);
    }

    this.store.startedQuizQuestionIndex.set(startedQuizQuestionIndex + 1);
    this.userAnswer.set("");

    if(this.store.startedQuizQuestionIndex() === this.store.startedQuiz()?.questions.length) {
      this.router.navigate(['finish-quiz']);
    }
  }
}
