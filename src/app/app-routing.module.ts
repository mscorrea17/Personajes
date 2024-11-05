import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListPersonajesComponent } from './pages/list-personajes/list-personajes.component';
import { ListHeroesComponent } from './pages/list-heroes/list-heroes.component';
import { CrearPersonajeComponent } from './pages/crear-personaje/crear-personaje.component';
import { CrearHeroeComponent } from './pages/crear-heroe/crear-heroe.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'list-personajes', component: ListPersonajesComponent},
  { path: 'list-heroes', component: ListHeroesComponent},
  { path: 'crea-personaje', component: CrearPersonajeComponent},
  { path: 'crea-heroe', component: CrearHeroeComponent},
  { path: 'edit-personaje/:id', component: CrearPersonajeComponent},
  { path: 'edit-heroe/:id', component: CrearHeroeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
