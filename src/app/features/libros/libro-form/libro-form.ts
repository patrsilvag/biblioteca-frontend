import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LibroService } from '../../../core/services/libro.service';
import { Libro } from '../../../core/models/libro';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './libro-form.html',
})
export class LibroFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private libroService = inject(LibroService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  libroForm: FormGroup;
  idActual: number | null = null;

  constructor() {
    this.libroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      autor: ['', Validators.required],
      anioPublicacion: [new Date().getFullYear(), [Validators.required, Validators.min(1000)]],
      genero: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Verificamos si venimos a "editar" por el ID en la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idActual = +id;
      this.libroService.getLibro(this.idActual).subscribe({
        next: (libro) => this.libroForm.patchValue(libro),
        error: () => this.router.navigate(['/libros']),
      });
    }
  }

  guardar(): void {
    if (this.libroForm.invalid) return;

    const libro: Libro = this.libroForm.value;

    if (this.idActual) {
      // Editar: Llama al @PutMapping("/{id}") de tu Java
      this.libroService.actualizar(this.idActual, libro).subscribe(() => {
        this.router.navigate(['/libros']);
      });
    } else {
      // Crear: Llama al @PostMapping de tu Java
      this.libroService.crear(libro).subscribe(() => {
        this.router.navigate(['/libros']);
      });
    }
  }
}
