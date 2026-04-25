import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibroFormComponent } from './libro-form';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LibroService } from '../../../core/services/libro.service';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('LibroFormComponent', () => {
  let component: LibroFormComponent;
  let fixture: ComponentFixture<LibroFormComponent>;
  let libroService: LibroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroFormComponent, ReactiveFormsModule],
      providers: [provideRouter([]), LibroService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    TestBed.overrideComponent(LibroFormComponent, {
      set: { template: '<div></div>', styleUrls: [] },
    });

    fixture = TestBed.createComponent(LibroFormComponent);
    component = fixture.componentInstance;
    libroService = TestBed.inject(LibroService);
    fixture.detectChanges();
  });

  it('debe crear el componente del formulario', () => {
    expect(component).toBeTruthy();
  });

  it('debe ejecutar crear() al enviar un formulario válido sin ID (Cubre líneas 53-56)', () => {
    const spyCrear = vi.spyOn(libroService, 'crear').mockReturnValue(of({} as any));

    // 1. Nos aseguramos que idActual sea null (estado inicial)
    component.idActual = null;

    // 2. Llenamos el libroForm con datos válidos
    component.libroForm.patchValue({
      titulo: 'Nuevo Libro',
      autor: 'Autor Test',
      anioPublicacion: 2026,
      genero: 'Informatica',
    });

    // 3. Ejecutamos el método guardar
    component.guardar();

    expect(spyCrear).toHaveBeenCalled();
  });

  it('debe ejecutar actualizar() al enviar un formulario con ID (Cubre líneas 47-52)', () => {
    const spyActualizar = vi.spyOn(libroService, 'actualizar').mockReturnValue(of({} as any));

    // 1. Seteamos idActual para entrar en la rama de edición
    component.idActual = 99;

    // 2. Llenamos libroForm
    component.libroForm.patchValue({
      titulo: 'Libro Editado',
      autor: 'Autor Pro',
      anioPublicacion: 2024,
      genero: 'Ciencia',
    });

    component.guardar();

    expect(spyActualizar).toHaveBeenCalledWith(99, expect.any(Object));
  });
});
