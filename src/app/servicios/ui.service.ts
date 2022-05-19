import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class UiService {
   private _booleanoModificar: boolean = false;
   private subjectModificar = new Subject<any>();

   constructor() {}

   get booleanoModificar(): boolean {
      return this._booleanoModificar;
   }

   setBooleanoModificar(booleano: boolean) {
      this._booleanoModificar = booleano;
   }

   cambiarBooleanoModificar() {
      this._booleanoModificar = !this._booleanoModificar;
      this.subjectModificar.next(this._booleanoModificar);
   }

   onToggleModificar(): Observable<any> {
      return this.subjectModificar.asObservable();
   }
}
