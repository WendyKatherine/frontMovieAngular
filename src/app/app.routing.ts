import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './components/movies/movies.component';
import { CreatemovieComponent } from './components/createmovie/createmovie.component';
import { DetailmovieComponent } from './components/detailmovie/detailmovie.component';
import { EditmovieComponent } from './components/editmovie/editmovie.component';

const appRoutes: Routes = [
    {path: '', component: MoviesComponent},
    {path: 'movies', component: MoviesComponent},
    {path: 'create-movie', component: CreatemovieComponent},
    {path: 'movie/:id', component: DetailmovieComponent},
    {path: 'edit-movie/:id', component: EditmovieComponent},
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(
  appRoutes, { useHash: true }
);