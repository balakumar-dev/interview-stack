import { Component, inject, input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CodeExample } from '../../../../core/models';

@Component({
  selector: 'app-code-examples',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './code-examples.html',
  styleUrl: './code-examples.scss',
})
export class CodeExamples {
  readonly example = input<CodeExample | undefined>();
  private readonly clipboard = inject(Clipboard);
  private readonly snackBar = inject(MatSnackBar);

  copy(code: string): void {
    if (this.clipboard.copy(code)) this.snackBar.open('Code copied to clipboard', 'Dismiss', { duration: 1800 });
  }
}