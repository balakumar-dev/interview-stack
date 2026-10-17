import { TestBed } from '@angular/core/testing';
import { UserDataService } from './user-data.service';
import { TopicProgress } from './models';

describe('UserDataService persistence contract', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [UserDataService] });
  });

  afterEach(() => localStorage.clear());

  it('writes progress, note, and bookmark using the existing key and record shape', () => {
    const service = TestBed.inject(UserDataService);
    service.update('rxjs', { bookmarked: true, completed: true, note: 'Review switchMap' });

    const saved = JSON.parse(localStorage.getItem('interview-prep.progress') ?? '{}') as Record<string, TopicProgress>;
    expect(saved['rxjs']).toMatchObject({ bookmarked: true, completed: true, note: 'Review switchMap' });
    expect(typeof saved['rxjs'].updatedAt).toBe('number');
  });

  it('deduplicates recent topics and retains at most six using topic IDs', () => {
    const service = TestBed.inject(UserDataService);
    for (const id of ['rxjs', 'routing', 'joins', 'indexes', 'middleware', 'signals', 'rxjs']) service.visit(id);

    expect(service.recent()).toEqual(['rxjs', 'signals', 'middleware', 'indexes', 'joins', 'routing']);
    expect(JSON.parse(localStorage.getItem('interview-prep.recent') ?? '[]')).toEqual(service.recent());
  });

  it('persists the theme value and keeps the expanded-category key separate', () => {
    const service = TestBed.inject(UserDataService);
    localStorage.setItem('interview-prep.expanded', '["angular","azure"]');

    service.toggleTheme();

    expect(JSON.parse(localStorage.getItem('interview-prep.theme') ?? 'null')).toBe('dark');
    expect(localStorage.getItem('interview-prep.expanded')).toBe('["angular","azure"]');
  });

  it('preserves expanded categories in their existing key and array format', () => {
    const service = TestBed.inject(UserDataService);
    localStorage.setItem('interview-prep.expanded', '["angular","azure"]');

    expect(service.getExpandedCategories()).toEqual(['angular', 'azure']);
    service.setExpandedCategories(['csharp']);
    expect(JSON.parse(localStorage.getItem('interview-prep.expanded') ?? '[]')).toEqual(['csharp']);
  });
});