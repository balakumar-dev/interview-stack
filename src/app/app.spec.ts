import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { ALL_TOPICS, TECHNOLOGIES } from './core/data/technologies.data';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the interview preparation dashboard', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('Interview Preparation');
    expect(compiled.querySelector('.welcome-row h1')?.textContent).toContain('Welcome to Interview Preparation');
  });

  it('should provide content for every navigation topic with unique route ids', () => {
    const ids = ALL_TOPICS.map((topic) => topic.id);
    expect(ALL_TOPICS.every((topic) => topic.content !== undefined)).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ALL_TOPICS.every((topic) => topic.content?.questions.length === 5)).toBe(true);
  });

  it('should keep the five technology categories and all 75 topics', () => {
    expect(TECHNOLOGIES.map((category) => category.id)).toEqual([
      'angular', 'dotnet', 'csharp', 'sql-server', 'azure',
    ]);
    expect(ALL_TOPICS).toHaveLength(75);
    expect(ALL_TOPICS.find((topic) => topic.id === 'rxjs')?.technologyId).toBe('angular');
    expect(ALL_TOPICS.find((topic) => topic.id === 'csharp-linq')?.technologyId).toBe('csharp');
    expect(ALL_TOPICS.find((topic) => topic.id === 'linq')?.technologyId).toBe('dotnet');
  });
});
