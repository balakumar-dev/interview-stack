import { InterviewTopic } from './interview-topic.model';

export interface TechnologyCategory {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly color: string;
  readonly topics: readonly InterviewTopic[];
}