import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosLista } from './libros-lista';

describe('LibrosLista', () => {
  let component: LibrosLista;
  let fixture: ComponentFixture<LibrosLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrosLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrosLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
