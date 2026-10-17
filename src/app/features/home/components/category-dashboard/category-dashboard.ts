import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TechnologyCategory } from '../../../../core/models';
import { TopicService } from '../../../../core/services/topic.service';

@Component({
  selector: 'app-category-dashboard',
  imports: [RouterLink, MatIconModule],
  templateUrl: './category-dashboard.html',
  styleUrl: './category-dashboard.scss',
})
export class CategoryDashboard implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly topics = inject(TopicService);
  private readonly destroyRef = inject(DestroyRef);
  readonly category = signal<TechnologyCategory | undefined>(undefined);

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.category.set(this.topics.getCategory(params.get('id')));
    });
  }
}