import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TopicConcept } from '../../../../core/models';

@Component({
  selector: 'app-key-concepts',
  imports: [DecimalPipe, MatIconModule],
  templateUrl: './key-concepts.html',
  styleUrl: './key-concepts.scss',
})
export class KeyConcepts {
  readonly concepts = input.required<readonly TopicConcept[]>();
  readonly standalone = input(false);
}