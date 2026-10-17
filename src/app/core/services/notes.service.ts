import { Injectable, inject } from '@angular/core';
import { UserNote } from '../models';
import { UserDataService } from '../user-data.service';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private readonly userData = inject(UserDataService);

  get(topicId: string): UserNote {
    const progress = this.userData.get(topicId);
    return { topicId, note: progress.note, updatedAt: progress.updatedAt };
  }

  save(topicId: string, note: string): UserNote {
    this.userData.update(topicId, { note });
    return this.get(topicId);
  }

  delete(topicId: string): void {
    this.userData.update(topicId, { note: '' });
  }
}