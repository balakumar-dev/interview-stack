import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/home/pages/home-dashboard/home-dashboard').then((module) => module.HomeDashboard), title: 'Interview Preparation' },
    { path: 'category/:id', loadComponent: () => import('./features/home/components/category-dashboard/category-dashboard').then((module) => module.CategoryDashboard), title: 'Technology | Interview Preparation' },
    { path: 'topic/:id', loadComponent: () => import('./features/topics/pages/topic-details/topic-details').then((module) => module.TopicDetails), title: 'Topic | Interview Preparation' },
    { path: '**', redirectTo: '' },
];
