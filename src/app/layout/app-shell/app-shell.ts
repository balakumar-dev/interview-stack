import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AppHeader } from '../app-header/app-header';
import { SidebarNavigation } from '../sidebar-navigation/sidebar-navigation';
import { TopicService } from '../../core/services/topic.service';
import { UserDataService } from '../../core/user-data.service';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, MatSnackBarModule, AppHeader, SidebarNavigation],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
export class AppShell implements OnInit {
  private readonly topicService = inject(TopicService);
  private readonly userData = inject(UserDataService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  readonly technologies = this.topicService.getCategories();
  readonly expanded = signal<string[]>(this.readExpanded());
  readonly sidebarCollapsed = signal(false);
  readonly mobileNavOpen = signal(false);

  ngOnInit(): void {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (!(event instanceof NavigationEnd)) return;
      this.mobileNavOpen.set(false);
      const segments = event.urlAfterRedirects.split('/').filter(Boolean);
      const categoryId = segments[0] === 'category'
        ? this.topicService.getCategory(segments[1])?.id
        : this.topicService.getTopic(segments.at(-1))?.technologyId;
      if (categoryId && !this.expanded().includes(categoryId)) this.toggleCategory(categoryId);
    });
  }

  toggleNavigation(): void {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches) {
      this.mobileNavOpen.update((open) => !open);
    } else {
      this.sidebarCollapsed.update((collapsed) => !collapsed);
    }
  }

  toggleCategory(id: string): void {
    const next = this.expanded().includes(id) ? this.expanded().filter((item) => item !== id) : [...this.expanded(), id];
    this.expanded.set(next);
    this.userData.setExpandedCategories(next);
  }

  showNotice(message: string): void {
    this.snackBar.open(message, 'Dismiss', { duration: 2600, horizontalPosition: 'end', verticalPosition: 'bottom' });
  }

  private readExpanded(): string[] {
    return this.userData.getExpandedCategories();
  }
}