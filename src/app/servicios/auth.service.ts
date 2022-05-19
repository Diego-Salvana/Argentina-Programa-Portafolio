import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { UiService } from './ui.service';

const httpOptions = {
   headers: new HttpHeaders({
      'Content-Type': 'application/json',
   }),
};

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   private urlUsuario: string = 'http://localhost:8080/api/usuario';
   public currentUserSubject!: BehaviorSubject<any>;

   constructor(private http: HttpClient, private uiSvc: UiService) {}

   iniciarSesion(credenciales: any): Observable<any> {
      return this.http
         .post<any>(this.urlUsuario, credenciales, httpOptions)
         .pipe(
            map((data) => {
               sessionStorage.setItem('currentUser', JSON.stringify(data));
               this.currentUserSubject.next(data);
               return data;
            })
         );
   }

   get UsuarioAutenticado() {
      return this.currentUserSubject.value;
   }

   verificaAutenticacion(): boolean {
      this.currentUserSubject = new BehaviorSubject<any>(
         JSON.parse(sessionStorage.getItem('currentUser') || '{}')
      );

      if (!this.currentUserSubject.value.token) {
         //console.log('Verificación: FALSE', this.currentUserSubject.value);
         return false;
      }

      //console.log('Verificación: TRUE', this.currentUserSubject.value);
      this.uiSvc.setBooleanoModificar(true);

      return true;
   }
}
