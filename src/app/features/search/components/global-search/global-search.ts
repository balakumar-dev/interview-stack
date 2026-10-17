import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { InterviewTopic } from '../../../../core/models';
import { SearchService } from '../../../../core/services/search.service';
import { TopicService } from '../../../../core/services/topic.service';

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './global-search.html',
  styleUrl: './global-search.scss',
})
export class GlobalSearchComponent implements OnInit {
  readonly search = new FormControl('', { nonNullable: true });
  readonly results = signal<readonly InterviewTopic[]>([]);
  readonly focused = signal(false);
  private readonly searchService = inject(SearchService);
  private readonly topicService = inject(TopicService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      startWith(this.search.value), debounceTime(160), distinctUntilChanged(),
      map((term) => this.searchService.search(term)), takeUntilDestroyed(this.destroyRef),
    ).subscribe((results) => this.results.set(results));
  }

  openFirstResult(): void {
    const first = this.results()[0];
    if (first) this.openTopic(first.id);
  }

  openTopic(id: string): void {
    if (!this.topicService.getTopic(id)) return;
    void this.router.navigate(['/topic', id]);
    this.clear();
  }

  clear(): void {
    this.search.setValue('');
    this.focused.set(false);
  }

  categoryIcon(topic: InterviewTopic): string {
    return this.topicService.getCategory(topic.technologyId)?.icon ?? 'article';
  }
}