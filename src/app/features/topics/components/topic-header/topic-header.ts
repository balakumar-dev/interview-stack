import { Component, computed, input, output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InterviewTopic } from '../../../../core/models';
import { TopicService } from '../../../../core/services/topic.service';

@Component({
  selector: 'app-topic-header',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './topic-header.html',
  styleUrl: './topic-header.scss',
})
export class TopicHeader {
  readonly topic = input.required<InterviewTopic>();
  readonly bookmarked = input(false);
  readonly completed = input(false);
  readonly bookmarkToggle = output<void>();
  readonly completionToggle = output<void>();
  private readonly topics = inject(TopicService);
  readonly category = computed(() => this.topics.getCategory(this.topic().technologyId));
}