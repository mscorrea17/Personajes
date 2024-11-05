import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ListHeroesComponent } from './pages/list-heroes/list-heroes.component';
import { ListPersonajesComponent } from './pages/list-personajes/list-personajes.component';
import { CrearPersonajeComponent } from './pages/crear-personaje/crear-personaje.component';
import { CrearHeroeComponent } from './pages/crear-heroe/crear-heroe.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CardComponent } from './shared/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListHeroesComponent,
    ListPersonajesComponent,
    CrearPersonajeComponent,
    CrearHeroeComponent,
    NavbarComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
