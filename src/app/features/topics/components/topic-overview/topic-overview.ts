import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TopicContent } from '../../../../core/models';

@Component({
  selector: 'app-topic-overview',
  imports: [MatIconModule],
  templateUrl: './topic-overview.html',
  styleUrl: './topic-overview.scss',
})
export class TopicOverview {
  readonly content = input.required<TopicContent>();
}