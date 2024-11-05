import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  personajeImageUrl: string = '';
  heroeImageUrl: string = '';

  constructor(private storageService: StorageService, private router: Router) {}

  async ngOnInit(): Promise<void> {
   
    await this.storageService.sincronizarPersonajes();
    await this.storageService.sincronizarHeroes();

    
    const personajes = this.storageService.getPersonajesDelStorage();
    const heroes = this.storageService.getHeroesDelStorage();

    if (personajes.length > 0) {
      this.personajeImageUrl = personajes[0].image; 
    }
    if (heroes.length > 0) {
      this.heroeImageUrl = heroes[0].img; 
    }
  }

  goToPersonajes() {
    this.router.navigate(['/list-personajes']);
  }

  goToHeroes() {
    this.router.navigate(['/list-heroes']);
  }
}
