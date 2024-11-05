import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Result } from '../../interfaces/personaje.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-personajes',
  templateUrl: './list-personajes.component.html',
  styleUrl: './list-personajes.component.css'
})
export class ListPersonajesComponent {
  personajes: Result[] = [];
  page: number = 1;
  hasMoreData: boolean = true;

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.personajes = this.storageService.getPersonajesDelStorage();
  }


  editarPersonaje(id: number): void {
    this.router.navigate(['/edit-personaje', id]);
  }

  eliminarPersonaje(id: number): void {
    this.storageService.eliminarPersonajeDelStorage(id);
    this.personajes = this.storageService.getPersonajesDelStorage();
  }

  
}
