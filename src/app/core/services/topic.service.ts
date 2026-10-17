import { Injectable } from '@angular/core';
import { ALL_TOPICS, findTopic, TECHNOLOGIES } from '../data/technologies.data';
import { InterviewTopic, TechnologyCategory, TopicContent } from '../models';

@Injectable({ providedIn: 'root' })
export class TopicService {
  getCategories(): readonly TechnologyCategory[] {
    return TECHNOLOGIES;
  }

  getTopics(): readonly InterviewTopic[] {
    return ALL_TOPICS;
  }

  getCategory(id: string | null | undefined): TechnologyCategory | undefined {
    return TECHNOLOGIES.find((category) => category.id === id);
  }

  getTopicsForCategory(id: string | null | undefined): readonly InterviewTopic[] {
    return this.getCategory(id)?.topics ?? [];
  }

  getTopic(id: string | null | undefined): InterviewTopic | undefined {
    return findTopic(id);
  }

  getContent(id: string | null | undefined): TopicContent | undefined {
    return this.getTopic(id)?.content;
  }
}