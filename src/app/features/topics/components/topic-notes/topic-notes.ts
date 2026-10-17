import { Component, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from '../../../../core/services/notes.service';

@Component({
  selector: 'app-topic-notes',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './topic-notes.html',
  styleUrl: './topic-notes.scss',
})
export class TopicNotes {
  readonly topicId = input.required<string>();
  readonly revision = input.required<readonly string[]>();
  readonly draft = signal('');
  private readonly notes = inject(NotesService);
  private readonly snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => this.draft.set(this.notes.get(this.topicId()).note));
  }

  save(): void {
    this.notes.save(this.topicId(), this.draft());
    this.snackBar.open('Notes saved on this device', 'Dismiss', { duration: 2200 });
  }

  clear(): void {
    this.notes.delete(this.topicId());
    this.draft.set('');
    this.snackBar.open('Notes cleared', 'Dismiss', { duration: 1800 });
  }
}