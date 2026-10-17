import { Injectable, signal } from '@angular/core';
import { TopicProgress } from './models';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  readonly theme = signal<'light' | 'dark'>(this.read('interview-prep.theme', 'light'));
  readonly progress = signal<Record<string, TopicProgress>>(this.read('interview-prep.progress', {}));
  readonly recent = signal<string[]>(this.read('interview-prep.recent', []));

  get(id: string): TopicProgress {
    return this.progress()[id] ?? { bookmarked: false, completed: false, note: '', updatedAt: 0 };
  }

  update(id: string, change: Partial<TopicProgress>): void {
    const next = { ...this.progress(), [id]: { ...this.get(id), ...change, updatedAt: Date.now() } };
    this.progress.set(next);
    this.write('interview-prep.progress', next);
  }

  visit(id: string): void {
    const next = [id, ...this.recent().filter((item) => item !== id)].slice(0, 6);
    this.recent.set(next);
    this.write('interview-prep.recent', next);
  }

  getExpandedCategories(): string[] {
    const saved = this.read<unknown>('interview-prep.expanded', ['angular']);
    return Array.isArray(saved) ? saved.filter((item): item is string => typeof item === 'string') : ['angular'];
  }

  setExpandedCategories(categoryIds: readonly string[]): void {
    this.write('interview-prep.expanded', [...categoryIds]);
  }

  toggleTheme(): void {
    const next = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(next);
    this.write('interview-prep.theme', next);
    this.applyTheme();
  }

  applyTheme(): void {
    if (typeof document !== 'undefined') document.documentElement.classList.toggle('dark-theme', this.theme() === 'dark');
  }

  private read<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) as T : fallback;
    } catch {
      return fallback;
    }
  }

  private write(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be unavailable in restricted browsing contexts.
    }
  }
}