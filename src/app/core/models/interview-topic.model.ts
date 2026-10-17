import { TopicContent } from './topic-content.model';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface InterviewTopic {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly technologyId: string;
  readonly technology: string;
  readonly difficulty: Difficulty;
  readonly minutes: number;
  readonly content?: TopicContent;
}