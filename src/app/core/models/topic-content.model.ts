import { CodeExample } from './code-example.model';
import { InterviewQuestion } from './interview-question.model';
import { TopicConcept } from './topic-concept.model';

export interface TopicContent {
  readonly introduction: string;
  readonly concepts: readonly TopicConcept[];
  readonly questions: readonly InterviewQuestion[];
  readonly codeExample?: CodeExample;
  readonly revision: readonly string[];
  readonly useCases: readonly string[];
}