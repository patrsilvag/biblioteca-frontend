import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrosListaComponent } from './libros-lista';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { LibroService } from '../../../core/services/libro.service';
import { of } from 'rxjs'; // Necesario para simular observables
import { vi } from 'vitest'; // Motor de mocks de Vitest

describe('LibrosListaComponent', () => {
  let component: LibrosListaComponent;
  let fixture: ComponentFixture<LibrosListaComponent>;
  let libroService: LibroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrosListaComponent],
      providers: [provideRouter([]), LibroService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    TestBed.overrideComponent(LibrosListaComponent, {
      set: {
        template: '<div></div>',
        styleUrls: [],
      },
    });

    fixture = TestBed.createComponent(LibrosListaComponent);
    component = fixture.componentInstance;
    libroService = TestBed.inject(LibroService);

    // Mock global para que el ngOnInit no falle al intentar listar
    vi.spyOn(libroService, 'listar').mockReturnValue(of([]));

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar la lista de libros al inicializar (Cubre líneas 26-32)', () => {
    const mockLibros = [
      { id: 1, titulo: 'Angular Pro', autor: 'Dev', anioPublicacion: 2024, genero: 'IT' },
    ];
    // Simulamos que el servicio devuelve un libro
    vi.spyOn(libroService, 'listar').mockReturnValue(of(mockLibros));

    component.listar(); // Llamada manual para asegurar cobertura

    expect(component.libros.length).toBe(1);
    expect(component.libros).toEqual(mockLibros);
  });

  it('debe eliminar un libro de la lista (Cubre líneas 34-38)', () => {
    // 1. Preparamos el componente con un libro
    component.libros = [
      { id: 1, titulo: 'Para eliminar', autor: 'A', anioPublicacion: 2020, genero: 'G' },
    ];

    // 2. Mocks para el confirm del navegador y para el servicio de eliminación
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    vi.spyOn(libroService, 'eliminar').mockReturnValue(of(void 0));

    // 3. Ejecutamos la acción
    component.eliminar(1);

    // 4. Verificamos que el arreglo local se filtró (quedó vacío)
    expect(component.libros.length).toBe(0);
  });
});
