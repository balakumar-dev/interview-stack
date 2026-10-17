import { InterviewTopic, TopicContent } from '../models';

export const content = (
  introduction: string,
  concepts: TopicContent['concepts'],
  questions: TopicContent['questions'],
  codeExample: TopicContent['codeExample'],
  revision: string[],
  useCases: string[],
): TopicContent => ({ introduction, concepts, questions, codeExample, revision, useCases });

export function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function makeTopic(title: string, technology = '.NET', technologyId = 'dotnet', id = slug(title), details?: TopicContent): InterviewTopic {
  return { id, title, description: `${title} interview concepts, design choices, and practical trade-offs.`, difficulty: 'Intermediate', minutes: 8, technologyId, technology, content: details };
}
