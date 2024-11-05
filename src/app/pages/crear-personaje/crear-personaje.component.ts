import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Result } from '../../interfaces/personaje.interface';

@Component({
  selector: 'app-crear-personaje',
  templateUrl: './crear-personaje.component.html',
  styleUrls: ['./crear-personaje.component.css']
})
export class CrearPersonajeComponent implements OnInit {
  personajeForm: FormGroup;
  isEditMode: boolean = false;
  personajeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.personajeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      species: ['', Validators.required],
      status: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.personajeId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    if (this.personajeId) {
      this.isEditMode = true;
      const personaje = this.storageService.getPersonajeDelStorage(this.personajeId);
      if (personaje) {
        this.personajeForm.patchValue(personaje);
      }
    }
  }

  onSubmit(): void {
    if (this.personajeForm.valid) {
      const personaje: Result = this.personajeForm.value;
      if (this.isEditMode) {
      
        this.storageService.editarPersonajeEnStorage(personaje);
      } else {
       
        personaje.id = Date.now(); 
        this.storageService.agregarPersonajeEnStorage(personaje);
      }
      this.router.navigate(['/list-personajes']);
    }
  }
}
