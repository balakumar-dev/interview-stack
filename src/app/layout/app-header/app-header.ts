import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../core/services/theme.service';
import { GlobalSearchComponent } from '../../features/search/components/global-search/global-search';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatSnackBarModule, MatTooltipModule, MatToolbarModule, GlobalSearchComponent],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  @Output() readonly navigationToggle = new EventEmitter<void>();
  @Output() readonly notice = new EventEmitter<string>();
  readonly theme = inject(ThemeService);

  toggleTheme(): void {
    this.theme.toggle();
  }
}