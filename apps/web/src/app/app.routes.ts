import type { Routes } from '@angular/router';
import { HomePage } from './home/home-page';
import { NotFoundPage } from './not-found/not-found-page';

const notFoundTitle = $localize`Page not found · MaksForge`;

export const routes: Routes = [
  { path: '', component: HomePage, title: $localize`MaksForge · Small, free apps` },
  { path: '404', component: NotFoundPage, title: notFoundTitle },
  { path: '**', component: NotFoundPage, title: notFoundTitle },
];
