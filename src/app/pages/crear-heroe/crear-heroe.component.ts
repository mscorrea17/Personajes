import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Resp } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-crear-heroe',
  templateUrl: './crear-heroe.component.html',
  styleUrls: ['./crear-heroe.component.css']
})
export class CrearHeroeComponent implements OnInit {
  heroeForm: FormGroup;
  isEditMode: boolean = false;
  heroeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.heroeForm = this.fb.group({
      _id: [null],
      nombre: ['', Validators.required],
      bio: ['', Validators.required],
      casa: ['', Validators.required],
      aparicion: ['', Validators.required],
      img: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   
    this.heroeId = this.route.snapshot.params['id'];
    if (this.heroeId) {
      this.isEditMode = true;
      const heroe = this.storageService.getHeroeDelStorage(this.heroeId);
      if (heroe) {
        this.heroeForm.patchValue(heroe);
      }
    }
  }

  onSubmit(): void {
    if (this.heroeForm.valid) {
      const heroe: Resp = this.heroeForm.value;
      if (this.isEditMode) {
       
        this.storageService.editarHeroeEnStorage(heroe);
      } else {
       
        heroe._id = Date.now().toString(); 
        this.storageService.agregarHeroeEnStorage(heroe);
      }
      this.router.navigate(['/list-heroes']);
    }
  }
}
