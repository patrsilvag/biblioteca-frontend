import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/libros'; // Tu endpoint de Spring Boot

  // GET: Obtener todos los libros (Conecta con tu nuevo @GetMapping)
  listar(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl); 
  }
  // GET: Obtener un libro por ID (usando el @GetMapping("/{id}") de tu Controller)
  getLibro(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  // POST: Crear libro (usando tu @PostMapping)
  crear(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  // PUT: Actualizar libro (usando tu @PutMapping("/{id}"))
  actualizar(id: number, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
  }

  // DELETE: Eliminar libro (usando tu @DeleteMapping("/{id}"))
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
