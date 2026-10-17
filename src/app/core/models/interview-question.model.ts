export interface InterviewQuestion {
  readonly question: string;
  readonly answer: string;
  readonly detail: string;
  readonly followUp?: string;
}