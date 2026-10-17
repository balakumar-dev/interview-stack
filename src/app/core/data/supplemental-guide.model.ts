import { CodeExample, TopicContent } from '../models';

export interface SupplementalGuide {
  overview: string;
  concepts: [string, string, string];
  example: string;
  tradeoff: string;
  validation: string;
  codeExample?: CodeExample;
}

export const guide = (
  overview: string,
  first: string,
  second: string,
  third: string,
  example: string,
  tradeoff: string,
  validation: string,
  codeExample?: CodeExample,
): SupplementalGuide => ({ overview, concepts: [first, second, third], example, tradeoff, validation, codeExample });
