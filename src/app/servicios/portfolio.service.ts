import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
   headers: new HttpHeaders({
      'Content-Type': 'application/json',
   }),
};

@Injectable({
   providedIn: 'root',
})
export class PortfolioService {
   constructor(private http: HttpClient) {}

   //CRUD
   obtenerDatos(url: string): Observable<any> {
      return this.http.get(url);
   }

   borrarItem(url: string): Observable<any> {
      return this.http.delete(url);
   }

   modificarItem(url: string, item: any): Observable<any> {
      return this.http.put(url, item, httpOptions);
   }

   agregarItem(url: string, item: any): Observable<any> {
      return this.http.post(url, item, httpOptions);
   }
}
