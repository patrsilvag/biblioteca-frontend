import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibroService } from '../../../core/services/libro.service';
import { Libro } from '../../../core/models/libro';

@Component({
  selector: 'app-libros-lista',
  standalone: true,
  // Importamos CommonModule para usar *ngFor y RouterLink para navegar [cite: 629, 796]
  imports: [CommonModule, RouterLink], 
  templateUrl: './libros-lista.html',
  styleUrl: './libros-lista.scss'
})
export class LibrosListaComponent implements OnInit {
  private libroService = inject(LibroService); // Inyectamos el servicio 
  
  libros: Libro[] = [];
  cargando = false;
  error = '';

  ngOnInit(): void {
    this.cargarLibros(); // Se ejecuta al cargar el componente 
  }

  cargarLibros(): void {
    this.cargando = true;
    this.libroService.listar().subscribe({
      next: (data) => {
        this.libros = data; // Guardamos los libros del backend 
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los libros desde la base de datos Oracle.'; 
        this.cargando = false;
      }
    });
  }

  eliminar(id?: number): void {
    if (id && confirm('¿Estás seguro de eliminar este libro?')) { 
      this.libroService.eliminar(id).subscribe({
        next: () => this.cargarLibros(), // Recargamos la lista tras eliminar 
        error: () => this.error = 'Error al intentar eliminar el libro.' 
      });
    }
  }
}