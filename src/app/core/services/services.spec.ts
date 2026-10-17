import { TestBed } from '@angular/core/testing';
import { NotesService } from './notes.service';
import { SearchService } from './search.service';
import { TopicService } from './topic.service';

describe('Core feature services', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  afterEach(() => localStorage.clear());

  it('provides the full catalog and resolves category and topic IDs', () => {
    const service = TestBed.inject(TopicService);
    expect(service.getCategories()).toHaveLength(5);
    expect(service.getTopics()).toHaveLength(75);
    expect(service.getCategory('angular')?.name).toBe('Angular');
    expect(service.getTopicsForCategory('sql-server').some((topic) => topic.id === 'joins')).toBe(true);
    expect(service.getTopic('rxjs')?.content?.questions).toHaveLength(5);
    expect(service.getTopic('missing-topic')).toBeUndefined();
  });

  it('searches existing catalog fields with the current minimum length and result cap', () => {
    const service = TestBed.inject(SearchService);
    expect(service.search('a')).toHaveLength(0);
    expect(service.search('switchMap').some((topic) => topic.id === 'rxjs')).toBe(true);
    expect(service.search('angular')).toHaveLength(8);
    expect(service.search('  not-a-topic  ')).toHaveLength(0);
  });

  it('saves and clears notes using the existing topic progress record', () => {
    const service = TestBed.inject(NotesService);
    const saved = service.save('rxjs', 'Review cancellation semantics');

    expect(saved).toMatchObject({ topicId: 'rxjs', note: 'Review cancellation semantics' });
    expect(service.get('rxjs')).toEqual(saved);
    expect(JSON.parse(localStorage.getItem('interview-prep.progress') ?? '{}')).toMatchObject({
      rxjs: { note: 'Review cancellation semantics', bookmarked: false, completed: false },
    });

    service.delete('rxjs');
    expect(service.get('rxjs').note).toBe('');
  });
});