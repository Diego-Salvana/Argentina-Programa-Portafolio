import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Usuario } from '../interfaces/usuario.interface';
import { UiService } from './ui.service';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   private urlUsuario: string = 'http://localhost:5001/usuario';

   constructor(private http: HttpClient, private uiSvc: UiService) {}

   obtenerUsuario(): Observable<Usuario> {
      return this.http.get<Usuario>(this.urlUsuario);
   }

   verificaAutenticacion(): boolean {
      if (!localStorage.getItem('token')) return false;

      this.uiSvc.setBooleanoModificar(true);

      return true;
   }
}
