import { Routes } from '@angular/router';
import { LibrosListaComponent } from './features/libros/libros-lista/libros-lista';
import { LibroFormComponent } from './features/libros/libro-form/libro-form';

export const routes: Routes = [
  // Ruta para la lista principal
  { path: 'libros', component: LibrosListaComponent },

  // Ruta para crear un libro nuevo
  { path: 'libros/nuevo', component: LibroFormComponent },

  // ESTA ES LA RUTA QUE TE FALTA O TIENE UN ERROR:
  // El ":id" es un comodín que permite recibir el 1, 2, 10, etc.
  { path: 'libros/editar/:id', component: LibroFormComponent },

  // Redirección inicial
  { path: '', redirectTo: 'libros', pathMatch: 'full' },

  // Ruta comodín por si escriben cualquier otra cosa
  { path: '**', redirectTo: 'libros' },
];
