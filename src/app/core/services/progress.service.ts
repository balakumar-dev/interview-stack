import { Injectable, inject } from '@angular/core';
import { findTopic } from '../data/technologies.data';
import { InterviewTopic, TopicProgress } from '../models';
import { UserDataService } from '../user-data.service';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly userData = inject(UserDataService);

  get(topicId: string): TopicProgress {
    return this.userData.get(topicId);
  }

  setBookmarked(topicId: string, bookmarked: boolean): void {
    this.userData.update(topicId, { bookmarked });
  }

  toggleBookmarked(topicId: string): boolean {
    const bookmarked = !this.get(topicId).bookmarked;
    this.setBookmarked(topicId, bookmarked);
    return bookmarked;
  }

  setCompleted(topicId: string, completed: boolean): void {
    this.userData.update(topicId, { completed });
  }

  toggleCompleted(topicId: string): boolean {
    const completed = !this.get(topicId).completed;
    this.setCompleted(topicId, completed);
    return completed;
  }

  visit(topicId: string): void {
    this.userData.visit(topicId);
  }

  getRecentTopics(): readonly InterviewTopic[] {
    return this.userData.recent().map((id) => findTopic(id)).filter((topic) => topic !== undefined);
  }
}