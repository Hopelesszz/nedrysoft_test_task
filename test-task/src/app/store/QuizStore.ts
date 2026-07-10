import { Injectable, inject, signal} from '@angular/core';
import { Question, QuestionApiResponse } from '../interfaces/questions';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../interfaces/quizes';

@Injectable({
  providedIn: 'root'
})
export class QuizStore {
  private readonly http = inject(HttpClient);
  public readonly quizes = signal<Quiz[]>([]);
  public readonly isLoading = signal<boolean>(false);
  public readonly startedQuiz = signal<Quiz | null>(null);
  public readonly isCancelPressed = signal<boolean>(false);
  public readonly loadError = signal(false);
  public startedQuizQuestionIndex = signal<number>(0);
  public correctAnswerCount = signal<number>(0);
  public wrongAnswerCount = signal<number>(0);
  public timer = signal<number | null>(null);
  public isRunning = signal<boolean>(false);
  public startTime = signal<number>(0);
  public elapsedTime = signal<number>(0);

  constructor() {
    this.getQuizes();
  }

  private shuffle(arr: string[]) {
    let newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }
  private changeAllHTMlEntities (str: string): string {
    return str.replaceAll("&quot;", '"')
      .replaceAll("&#039;", "'")
      .replaceAll("&apos;", "'")
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&nbsp;", " ")
      .replaceAll("&pi;", "π")
      .replaceAll("&deg;", "°")
      .replaceAll("&times;", "×")
      .replaceAll("&divide;", "÷")
      .replaceAll("&plusmn;", "±")
      .replaceAll("&hellip;", "…")
      .replaceAll("&mdash;", "—")
      .replaceAll("&ndash;", "–")
      .replaceAll("&lsquo;", "‘")
      .replaceAll("&rsquo;", "’")
      .replaceAll("&ldquo;", "“")
      .replaceAll("&rdquo;", "”")
      .replaceAll("&copy;", "©")
      .replaceAll("&reg;", "®")
      .replaceAll("&trade;", "™")
      .replaceAll("&Aring;", "Å")
      .replaceAll("&#039;", "'");
  }

  public getQuizes() {
    this.isLoading.set(true);
    this.http.get<QuestionApiResponse>('https://opentdb.com/api.php?amount=50').subscribe({
      next: (data) => {
        const allQuestions = data.results;
        const generatedQuizes: Quiz[] = [];

        for (let i = 0; i < 10; i++) {
          const startIndex = i * 5;
          const quizQuestions = allQuestions.slice(startIndex, startIndex + 5);
          for(let j = 0; j < quizQuestions.length; j++) {
            const answers: string[] = [];
            quizQuestions[j].question = this.changeAllHTMlEntities(quizQuestions[j].question);
            answers.push(...quizQuestions[j].incorrect_answers,quizQuestions[j].correct_answer);
            quizQuestions[j].answers = this.shuffle(answers);
          }

          const quiz: Quiz = {
            id: i + 1,
            name: `Quiz ${i + 1}`,
            questions: quizQuestions,
            correctAnswersCount: 0,
            wrongAnswersCount: 0
          };
          generatedQuizes.push(quiz);
        }

        this.quizes.set(generatedQuizes);
        this.loadError.set(false);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error:', err);
        this.loadError.set(true);
        this.isLoading.set(false);
      }
    });
  }

  public startQuiz (quiz: Quiz) {
    this.startedQuiz.set(quiz);
  }
  public endQuiz () {
    this.startedQuiz.set(null);
    this.startedQuizQuestionIndex.set(0);
    this.correctAnswerCount.set(0);
    this.wrongAnswerCount.set(0);
  }
  public startTimer() {
    if (!this.isRunning()) {
      this.startTime.set(Date.now() - this.elapsedTime());
      const id = window.setInterval(() => {
        this.elapsedTime.set(Date.now() - this.startTime());
      }, 1000);
      this.timer.set(id);
      this.isRunning.set(true);
    }
  }
  public cancelTimer() {
    const id = this.timer();
    if (id !== null) {
      clearInterval(id);
      this.timer.set(null);
    }
    this.isRunning.set(false);
    this.elapsedTime.set(0);
  }
  public endTimer() {
    const id = this.timer();
    if (id !== null) {
      clearInterval(id);
      this.timer.set(null);
    }
    this.isRunning.set(false);
  }
};
