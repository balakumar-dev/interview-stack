import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TechnologyCategory } from '../../core/models';
import { ProgressService } from '../../core/services/progress.service';

@Component({
  selector: 'app-sidebar-navigation',
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatTooltipModule],
  host: { '[class.sidebar-collapsed]': 'collapsed', '[class.mobile-nav-open]': 'mobileOpen' },
  templateUrl: './sidebar-navigation.html',
  styleUrl: './sidebar-navigation.scss',
})
export class SidebarNavigation {
  @Input({ required: true }) technologies: readonly TechnologyCategory[] = [];
  @Input() expanded: readonly string[] = [];
  @Input() collapsed = false;
  @Input() mobileOpen = false;
  @Output() readonly categoryToggle = new EventEmitter<string>();
  @Output() readonly collapseToggle = new EventEmitter<void>();
  @Output() readonly closeDrawer = new EventEmitter<void>();
  readonly progress = inject(ProgressService);

  isExpanded(id: string): boolean {
    return this.expanded.includes(id);
  }
}