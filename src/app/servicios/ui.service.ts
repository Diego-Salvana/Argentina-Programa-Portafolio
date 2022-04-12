import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class UiService {
   private booleano: boolean = false;
   private subject = new Subject<any>();
   private booleanoModificar: boolean = false;
   private subjectModificar = new Subject<any>();

   constructor() {}

   cambiarBooleano(): void {
      this.booleano = !this.booleano;
      this.subject.next(this.booleano);
   }

   onToggle(): Observable<any> {
      return this.subject.asObservable();
   }

   cambiarBooleanoModificar() {
      this.booleanoModificar = !this.booleanoModificar;
      this.subjectModificar.next(this.booleanoModificar);
   }

   onToggleModificar(): Observable<any> {
      return this.subjectModificar.asObservable();
   }
}
