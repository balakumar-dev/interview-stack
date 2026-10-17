import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { InterviewTopic } from '../../../../core/models';
import { ProgressService } from '../../../../core/services/progress.service';
import { TopicService } from '../../../../core/services/topic.service';
import { CodeExamples } from '../../components/code-examples/code-examples';
import { InterviewQuestions } from '../../components/interview-questions/interview-questions';
import { KeyConcepts } from '../../components/key-concepts/key-concepts';
import { TopicHeader } from '../../components/topic-header/topic-header';
import { TopicNotes } from '../../components/topic-notes/topic-notes';
import { TopicOverview } from '../../components/topic-overview/topic-overview';

@Component({
  selector: 'app-topic-details',
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTabsModule, TopicHeader, TopicOverview, KeyConcepts, InterviewQuestions, CodeExamples, TopicNotes],
  templateUrl: './topic-details.html',
  styleUrl: './topic-details.scss',
})
export class TopicDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly topics = inject(TopicService);
  readonly progress = inject(ProgressService);
  private readonly destroyRef = inject(DestroyRef);
  readonly topic = signal<InterviewTopic | undefined>(undefined);

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const topic = this.topics.getTopic(params.get('id'));
      this.topic.set(topic);
      if (topic) this.progress.visit(topic.id);
    });
  }

  isBookmarked(id: string): boolean {
    return this.progress.get(id).bookmarked;
  }

  isCompleted(id: string): boolean {
    return this.progress.get(id).completed;
  }

  toggleBookmark(id: string): void {
    this.progress.toggleBookmarked(id);
  }

  toggleCompleted(id: string): void {
    this.progress.toggleCompleted(id);
  }
}