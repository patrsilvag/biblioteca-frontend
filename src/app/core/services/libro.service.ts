import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Libro } from '../models/libro'; // Ajusta la ruta a tu modelo

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  listar(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  // Asegúrate de que estos nombres coincidan con los que llaman tus componentes
  getLibro(id: number): Observable<Libro> {
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
