import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProgressService } from '../../../../core/services/progress.service';
import { TopicService } from '../../../../core/services/topic.service';

@Component({
  selector: 'app-home-dashboard',
  imports: [RouterLink, MatIconModule],
  templateUrl: './home-dashboard.html',
  styleUrl: './home-dashboard.scss',
})
export class HomeDashboard {
  private readonly topics = inject(TopicService);
  readonly progress = inject(ProgressService);
  readonly technologies = this.topics.getCategories();
  readonly totalTopics = this.topics.getTopics().length;

  get recentTopics() {
    return this.progress.getRecentTopics();
  }

  categoryIcon(id: string): string {
    return this.topics.getCategory(id)?.icon ?? 'article';
  }

  completedFor(id: string): number {
    return this.topics.getTopicsForCategory(id).filter((topic) => this.progress.get(topic.id).completed).length;
  }

  progressFor(id: string): number {
    const category = this.topics.getCategory(id);
    return category ? Math.round(this.completedFor(id) / category.topics.length * 100) : 0;
  }
}