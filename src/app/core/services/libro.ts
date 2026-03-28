import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la app [cite: 114]
})
export class LibroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/libros'; // Tu URL de Spring Boot [cite: 147]

  listar(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  crear(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  actualizar(id: number, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
