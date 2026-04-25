import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { LibroService } from './libro.service';
import { environment } from '../../../environments/environment';
import { Libro } from '../models/libro';

describe('LibroService', () => {
  let service: LibroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibroService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(LibroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe obtener la lista de libros (GET)', () => {
    // CORRECCIÓN: Se agregan los campos faltantes exigidos por la interfaz Libro
    const mockLibros: Libro[] = [
      {
        id: 1,
        titulo: 'Angular v18',
        autor: 'Instructor',
        anioPublicacion: 2024,
        genero: 'Informática',
      },
      {
        id: 2,
        titulo: 'Spring Boot 3',
        autor: 'Instructor',
        anioPublicacion: 2023,
        genero: 'Informática',
      },
    ];

    service.listar().subscribe((libros) => {
      expect(libros.length).toBe(2);
      expect(libros).toEqual(mockLibros);
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockLibros);
  });

  it('debe obtener un libro por ID (GET)', () => {
    const mockLibro: Libro = {
      id: 1,
      titulo: 'Angular v18',
      autor: 'Instructor',
      anioPublicacion: 2024,
      genero: 'Informática',
    };

    service.getLibro(1).subscribe((libro) => {
      expect(libro).toEqual(mockLibro);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLibro);
  });

  it('debe crear un nuevo libro (POST)', () => {
    const nuevoLibro: Libro = {
      titulo: 'Java Unit Testing',
      autor: 'Test',
      anioPublicacion: 2025,
      genero: 'Informática',
    };

    service.crear(nuevoLibro).subscribe((libro) => {
      expect(libro).toEqual(nuevoLibro);
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(nuevoLibro);
  });

  it('debe eliminar un libro (DELETE)', () => {
    service.eliminar(1).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

it('debe actualizar un libro (PUT)', () => {
  const libroEditado: Libro = {
    id: 1,
    titulo: 'Angular Pro',
    autor: 'Dev',
    anioPublicacion: 2024,
    genero: 'IT',
  };

  service.actualizar(1, libroEditado).subscribe((res) => expect(res).toEqual(libroEditado));

  const req = httpMock.expectOne(`${environment.apiUrl}/1`);
  expect(req.request.method).toBe('PUT');
  req.flush(libroEditado);
});


});
