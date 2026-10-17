import { Injectable } from '@angular/core';
import { ALL_TOPICS } from '../data/technologies.data';
import { InterviewTopic } from '../models';

@Injectable({ providedIn: 'root' })
export class SearchService {
  search(term: string): readonly InterviewTopic[] {
    const query = term.trim().toLowerCase();
    if (query.length < 2) return [];

    return ALL_TOPICS.filter((topic) => {
      const haystack = [
        topic.title,
        topic.technology,
        topic.description,
        ...(topic.content?.concepts.map((concept) => `${concept.title} ${concept.explanation}`) ?? []),
        ...(topic.content?.questions.map((question) => `${question.question} ${question.answer}`) ?? []),
      ].join(' ').toLowerCase();
      return haystack.includes(query);
    }).slice(0, 8);
  }
}