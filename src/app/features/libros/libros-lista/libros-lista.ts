import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibroService } from '../../../core/services/libro.service';
import { Libro } from '../../../core/models/libro';

@Component({
  selector: 'app-libros-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './libros-lista.html',
  styleUrl: './libros-lista.scss',
})
export class LibrosListaComponent implements OnInit {
  libros: Libro[] = [];

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.libroService.listar().subscribe({
      next: (data) => {
        this.libros = data;
      },
      error: (err) => console.error('Error al cargar libros', err),
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      this.libroService.eliminar(id).subscribe({
        next: () => {
          this.libros = this.libros.filter((l) => l.id !== id);
        },
        error: (err) => alert('Error al eliminar: ' + err),
      });
    }
  }
} // <--- Esta es la ÚLTIMA llave del archivo. No debe haber nada más después.
