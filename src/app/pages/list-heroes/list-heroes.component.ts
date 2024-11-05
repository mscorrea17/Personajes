import { Component } from '@angular/core';
import { Resp } from '../../interfaces/heroe.interface';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-heroes',
  templateUrl: './list-heroes.component.html',
  styleUrl: './list-heroes.component.css'
})
export class ListHeroesComponent {
  heroes: Resp[] = [];

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.heroes = this.storageService.getHeroesDelStorage();

    console.log('Heroes', this.heroes)
  }

  editarHeroe(id: string): void {
    this.router.navigate(['/edit-heroe', id]);
  }

  eliminarHeroe(id: string): void {
    this.storageService.eliminarHeroeDelStorage(id);
    this.heroes = this.storageService.getHeroesDelStorage();
  }
}
