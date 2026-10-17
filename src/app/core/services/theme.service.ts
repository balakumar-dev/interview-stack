import { Injectable, inject } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly userData = inject(UserDataService);
  readonly theme = this.userData.theme;

  apply(): void {
    this.userData.applyTheme();
  }

  toggle(): void {
    this.userData.toggleTheme();
  }
}