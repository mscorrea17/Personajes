import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  ResponsePersonajes,
  Result as Personaje,
} from '../interfaces/personaje.interface';
import { ResponseHeroes, Resp as Heroe } from '../interfaces/heroe.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageKeyP = 'personajes';
  private storageKeyH = 'heroes';

  constructor(private http: HttpClient) {}

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  async sincronizarPersonajes() {
    if (this.isLocalStorageAvailable()) {
      try {
        const response = await firstValueFrom(this.getPersonajes());
        localStorage.setItem(
          this.storageKeyP,
          JSON.stringify(response.results)
        );
        console.log('Personajes sincronizados y guardados en Local Storage.');
      } catch (error) {
        console.error('Error al sincronizar personajes:', error);
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }

  async sincronizarHeroes() {
    if (this.isLocalStorageAvailable()) {
      try {
        const response = await firstValueFrom(this.getHeroes());
        localStorage.setItem(this.storageKeyH, JSON.stringify(response.resp));
        console.log('Héroes sincronizados y guardados en Local Storage.');
      } catch (error) {
        console.error('Error al sincronizar héroes:', error);
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }

  getPersonajes() {
    return this.http.get<ResponsePersonajes>(
      `${environment.base_urlRick}/character`
    );
  }

  getHeroes() {
    return this.http.get<ResponseHeroes>(
      `${environment.base_urlHeroes}/heroes`
    );
  }

  getPersonajesDelStorage(): Personaje[] {
    if (this.isLocalStorageAvailable()) {
      const data = localStorage.getItem(this.storageKeyP);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  getPersonajeDelStorage(id: number): Personaje | undefined {
    return this.getPersonajesDelStorage().find(
      (personaje) => personaje.id === id
    );
  }

  agregarPersonajeEnStorage(personaje: Personaje) {
    const personajes = this.getPersonajesDelStorage();
    personajes.unshift(personaje);
    localStorage.setItem(this.storageKeyP, JSON.stringify(personajes));
  }

  editarPersonajeEnStorage(personaje: Personaje) {
    const personajes = this.getPersonajesDelStorage().map((p) =>
      p.id === personaje.id ? personaje : p
    );
    localStorage.setItem(this.storageKeyP, JSON.stringify(personajes));
  }

  eliminarPersonajeDelStorage(id: number) {
    const personajes = this.getPersonajesDelStorage().filter(
      (p) => p.id !== id
    );
    localStorage.setItem(this.storageKeyP, JSON.stringify(personajes));
  }

  getHeroesDelStorage(): Heroe[] {
    if (this.isLocalStorageAvailable()) {
      const data = localStorage.getItem(this.storageKeyH);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  getHeroeDelStorage(id: string): Heroe | undefined {
    return this.getHeroesDelStorage().find((heroe) => heroe._id === id);
  }

  agregarHeroeEnStorage(heroe: Heroe) {
    const heroes = this.getHeroesDelStorage();
    heroes.unshift(heroe);
    localStorage.setItem(this.storageKeyH, JSON.stringify(heroes));
  }

  editarHeroeEnStorage(heroe: Heroe) {
    const heroes = this.getHeroesDelStorage().map((h) =>
      h._id === heroe._id ? heroe : h
    );
    localStorage.setItem(this.storageKeyH, JSON.stringify(heroes));
  }

  eliminarHeroeDelStorage(id: string) {
    const heroes = this.getHeroesDelStorage().filter((h) => h._id !== id);
    localStorage.setItem(this.storageKeyH, JSON.stringify(heroes));
  }
}
