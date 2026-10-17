import { Component, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { InterviewQuestion } from '../../../../core/models';

@Component({
  selector: 'app-interview-questions',
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './interview-questions.html',
  styleUrl: './interview-questions.scss',
})
export class InterviewQuestions {
  readonly questions = input.required<readonly InterviewQuestion[]>();
}