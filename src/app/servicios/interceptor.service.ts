import {
   HttpEvent,
   HttpHandler,
   HttpInterceptor,
   HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
   providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
   constructor(private authSvc: AuthService) {}

   intercept(
      req: HttpRequest<any>,
      next: HttpHandler
   ): Observable<HttpEvent<any>> {
      var datosVerificacion = this.authSvc.UsuarioAutenticado;
      if (datosVerificacion && datosVerificacion.token) {
         req = req.clone({
            setHeaders: {
               Authorization: "Interceptor funcionando!",
            }
         })
      }

      return next.handle(req);
   }
}
